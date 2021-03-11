import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contest, ContestQuestion } from 'src/interfaces/contest.interface';
import { Model, PaginateModel, Types } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Cron } from '@nestjs/schedule';
import { Question } from 'src/interfaces/question.interface';
import { ApolloError } from 'apollo-server-express';
// import * as lodash from "lodash";

@Injectable()
export class ContestService {

    constructor(
        // private readonly userService: UserService,
        // private readonly contestService: ContestService,
        @Inject('PUB_SUB_MESSAGE') public readonly pubSub: PubSub,
        @InjectModel("Contest") private readonly contestModel: Model<Contest>,
        @InjectModel("Question") private readonly questionModel: Model<Question>,
        @InjectModel("ContestQuestion") private readonly contestQuestionModel: Model<ContestQuestion>,
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

    // @Cron("* * * * * *")
    // async checkContestStart() {
    //     const now = Date.now();
    //     const contests = await this.contestModel.find({
    //         $and: [
    //             { timeStart: { $lte: now } },
    //             { started: { $eq: false } }
    //         ]
    //     })
    //     const ids = contests.map(c => c._id);
    //     this.contestModel.updateMany({ _id: { $in: ids } }, {
    //         $set: { started: true }
    //     }).exec();
    //     console.log("cron", now, contests)
    //     contests.forEach(c => {
    //         const publish = {
    //             listenContestStart: {
    //                 time: 1
    //             }
    //         }
    //         this.pubSub.publish(`CONTEST_START: ${c._id}`, publish);
    //         // this.pubSub.subscribe()
    //         const counter = new Counter(this, c);
    //         counter.start();
    //     })
    // }

}

class Counter {

    // contest: Contest

    constructor(
        private readonly contestService: ContestService,
        private readonly contest: Contest
    ) { }

    publishTime(time: number) {
        console.log(time);
        const publish = {
            listenContestStart: {
                time,
                // question
            }
        }
        
        this.contestService.pubSub.publish(`CONTEST_START: ${this.contest._id}`, publish);
    }

    async start() {
        console.log("start");

        const questions = await this.contestService.getQuestionOfContest(this.contest._id);
        for (let index = 0; index < questions.length; index++) {
            // const element = questions[index];
            const sleep = this.sleep;
            await sleep(questions[index].currentTime * 1000, this.publishTime.bind(this));
            await sleep(5000, this.publishTime.bind(this))
            // clearInterval(slee)
        }
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
