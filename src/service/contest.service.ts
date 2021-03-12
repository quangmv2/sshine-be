import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer, Contest, ContestQuestion } from 'src/interfaces/contest.interface';
import { Model, PaginateModel, Types } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Cron } from '@nestjs/schedule';
import { Question } from 'src/interfaces/question.interface';
import { ApolloError } from 'apollo-server-express';
import { EnumListenContest } from 'src/graphql';
import * as _ from "lodash";
import { UserService } from './user.service';

@Injectable()
export class ContestService {

    constructor(
        private readonly userService: UserService,
        // private readonly contestService: ContestService,
        @Inject('PUB_SUB_MESSAGE') public readonly pubSub: PubSub,
        @InjectModel("Contest") private readonly contestModel: Model<Contest>,
        @InjectModel("Question") private readonly questionModel: Model<Question>,
        @InjectModel("ContestQuestion") private readonly contestQuestionModel: Model<ContestQuestion>,
        @InjectModel("Answer") public readonly answerModel: Model<Answer>,
    ) { }

    async findContest(id: string): Promise<Contest> {
        return this.contestModel.findById(id);
    }

    //     async listenNewMessage(user_id) {
    //         return this.pubSub.asyncIterator(`MESSAGE: ${user_id}`);
    //     }

    async addQuestion(input) {
        const { id_contest, id_question } = input;

        const contest = await this.contestModel.findById(id_contest);
        if (!contest) throw new ApolloError("Da ton tai", "GRAPHQL_VALIDATION_FAILED")
        const [arr, result] = this.toggleArrayItem(contest.id_questions, id_question);
        contest.id_questions = arr
        console.log(contest.id_questions.includes(id_question));
        contest.save();
        return result;
    }

    async toogleUserToContets(input) {
        const { id_contest, id_user } = input;

        const contest = await this.contestModel.findById(id_contest);
        if (!contest) throw new ApolloError("Da ton tai", "GRAPHQL_VALIDATION_FAILED")
        const [arr, result] = this.toggleArrayItem(contest.id_users, id_user);
        contest.id_users = arr
        console.log(contest.id_users.includes(id_user));
        contest.save();
        return result;
    }

    toggleArrayItem(arr, item) {
        return arr.includes(item)
            ? [arr.filter(i => i != item), "remove"] // remove item
            : [[...arr, item], "add"]; // add item
    }

    async listenContestStart(id_contest: string) {
        return this.pubSub.asyncIterator(`CONTEST_START: ${id_contest}`);
    }

    async listenResult(id_contest: string) {
        return this.pubSub.asyncIterator(`RESULT: ${id_contest}`);
    }

    async getQuestionOfContest(id_contest: string): Promise<Question[]> {
        console.log(id_contest);

        const contest = await this.contestModel.aggregate().match({
            _id: Types.ObjectId(id_contest)
        }).lookup({
            from: "questions",
            localField: "id_questions",
            foreignField: "_id",
            as: "questions"
        });
        // console.log(contest[0].questions);

        return contest[0].questions;
    }

    async checkResult(id_contest: string, id_question: string) {
        const constest = await this.contestModel.findById(id_contest);
        const question = await this.questionModel.findById(id_question);
    }

    async resultUpdate(contest: Contest) {
        console.log(contest);
        const results = []
        for (let index = 0; index < contest.id_users.length; index++) {
            const element = contest.id_users[index];
            // const r = await this.answerModel.find({
            //     $and: [
            //         { id_contest: contest.id },
            //         { id_user: contest.id_users[index] }
            //     ]
            // })
            const user = await this.userService.getUserById(contest.id_users[index]);
            if (!user) continue
            const r = await this.answerModel.aggregate().match({
                id_contest: Types.ObjectId(contest.id),
                id_user: Types.ObjectId(contest.id_users[index])
            }).lookup({
                from: 'questions',
                localField: "id_question",
                foreignField: "_id",
                as: "questions"
            }).project({
                'question': { "$arrayElemAt": ["$questions", 0] },
                'answer': '$answer'
            })
            const sum = r.reduce((value: any, re: any) => {
                return re.answer == re.question.answer ? value + 1 : value;
            }, 0)

            // for
            console.log(r, sum);
            results.push({
                user,
                correct: sum,
                reject: _.indexOf(contest.id_users_reject, contest.id_users[index]) > -1
            })
        }
        console.log(results);
        results.sort((a, b) => {
            return b.correct - a.correct;
        })
        this.pubSub.publish(`RESULT: ${contest.id}`, {
            listenResult: results
        })
        return results;
    }

    @Cron("* * * * * *")
    async checkContestStart() {
        const now = Date.now();
        const contests = await this.contestModel.find({
            $and: [
                { timeStart: { $lte: now } },
                { started: { $eq: false } }
            ]
        })
        const ids = contests.map(c => c._id);
        this.contestModel.updateMany({ _id: { $in: ids } }, {
            $set: { started: true }
        }).exec();
        console.log("cron", now, contests)
        contests.forEach(c => {
            const publish = {
                listenContestStart: {
                    time: 1
                }
            }
            this.pubSub.publish(`CONTEST_START: ${c._id}`, publish);
            // this.pubSub.subscribe()
            const counter = new Counter(this, c);
            counter.start();
        })
    }

}

class Counter {

    // contest: Contest

    constructor(
        private readonly contestService: ContestService,
        private readonly contest: Contest
    ) { }

    questionNow = {};
    total = 0;
    doing = 0

    async rejectUser(users: string[], question) {
        const usersFilter = []
        for (let index = 0; index < users.length; index++) {
            const answer = await this.contestService.answerModel.findOne({
                $and: [
                    { id_contest: this.contest.id },
                    { id_question: question._id },
                    { id_user: users[index] }
                ]
            });
            if (!answer) {
                usersFilter.push(users[index])
                continue
            }
            if (answer.answer == question.answer) continue;
            usersFilter.push(users[index])
        }


        console.log("fill", usersFilter);

        usersFilter.forEach(u => {
            this.contestService.pubSub.publish(`CONTEST_START: ${this.contest._id}`, {
                listenContestStart: {
                    type: EnumListenContest.STOP,
                    user_id: u
                }
            })
        })
        // usersFilter.sort
        this.contest.id_users_reject = this.contest.id_users_reject.concat(usersFilter);
        await this.contest.save();
    }

    publishTime(time: number) {
        // console.log(time);

        const publish = {
            listenContestStart: {
                time,
                question: {
                    ...this.questionNow,
                    answer: null,
                },
                total: this.total,
                doing: this.doing,
                type: EnumListenContest.QUESTION
            }
        }
        console.log(`CONTEST_START: ${this.contest._id}`, publish);

        this.contestService.pubSub.publish(`CONTEST_START: ${this.contest._id}`, publish);
    }

    publishTimeWaitting(time: number) {
        // console.log(time);
        const publish = {
            listenContestStart: {
                time,
                type: EnumListenContest.WAITTING_QUESTION
            }
        }
        // console.log(`CONTEST_START: ${this.contest._id}`, publish);

        this.contestService.pubSub.publish(`CONTEST_START: ${this.contest._id}`, publish);
    }


    async start() {
        console.log("start");
        const questions = await this.contestService.getQuestionOfContest(this.contest._id);
        this.contestService.pubSub.publish(`CONTEST_START: ${this.contest._id}`, {
            listenContestStart: {
                type: EnumListenContest.NEXT,
                total: questions.length,
                doing: 1
            }
        })
        this.total = questions.length;
        for (let index = 0; index < questions.length; index++) {
            // const element = questions[index];
            this.doing = index + 1;
            this.questionNow = questions[index]
            const sleep = this.sleep;
            await sleep(questions[index].currentTime * 1000, this.publishTime.bind(this));
            this.contest.id_questions_reject.push(questions[index]._id);
            try {
                await this.contest.save()
            } catch (err) {
                console.log(err);
            }
            this.contestService.pubSub.publish(`CONTEST_START: ${this.contest._id}`, {
                listenContestStart: {
                    type: EnumListenContest.ANSWER,
                    answer: {
                        id_question: questions[index]._id,
                        answer: questions[index].answer
                    },
                    total: this.total,
                    doing: this.doing
                }
            })
            await this.rejectUser(_.difference(this.contest.id_users, this.contest.id_users_reject), questions[index])
            this.contestService.resultUpdate(this.contest)
            await sleep(5000, this.publishTimeWaitting.bind(this))
            if (index < questions.length - 1) {
                this.contestService.pubSub.publish(`CONTEST_START: ${this.contest._id}`, {
                    listenContestStart: {
                        type: EnumListenContest.NEXT,
                        total: questions.length,
                        doing: this.doing + 1
                    }
                })
            }
            // clearInterval(slee)
        }
        this.contestService.pubSub.publish(`CONTEST_START: ${this.contest._id}`, {
            listenContestStart: {
                type: EnumListenContest.END
            }
        })
    }

    async sleep(time: number, _callback?: Function) {
        let idInteval: any = 0
        let currentTime = time
        return new Promise(resolve => {
            // setTimeout(resolve, time)
            idInteval = setInterval(() => {
                _callback(currentTime);
                if (currentTime < 1) {
                    clearInterval(idInteval);
                    resolve('')
                }
                currentTime -= 1000;
            }, 1000);
            setTimeout(() => {
                clearInterval(idInteval);
                resolve('')
            }, currentTime + 5000);
        });
    }

}
