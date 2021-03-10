import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contest, ContestQuestion } from 'src/interfaces/contest.interface';
import { Model, PaginateModel, Types } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Cron } from '@nestjs/schedule';
import { Question } from 'src/interfaces/question.interface';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class ContestService {

    constructor(
        // private readonly userService: UserService,
        // private readonly contestService: ContestService,
        @Inject('PUB_SUB_MESSAGE') private readonly pubSub: PubSub,
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

        const contest = await this.contestModel.findOne({
            $and: [
                {
                    _id: { $eq: id_contest }
                },
                {
                    id_questions: {
                        $nin: [id_question]
                    }
                }
            ]
        });
        if (!contest) throw new ApolloError("Da ton tai", "GRAPHQL_VALIDATION_FAILED")
        contest.id_questions.push(id_question);
        contest.save();
        return null
    }

    async listenContestStart(id_contest: string) {
        return this.pubSub.asyncIterator(`CONTEST_START: ${id_contest}`);
    }

    async getQuestionOfContest(id_contest: string): Promise<Question[]> {
        console.log(id_contest);

        const contest = await this.contestModel.aggregate().match({
            _id: Types.ObjectId(id_contest)
        })
            .lookup({
                from: "questions",
                localField: "id_questions",
                foreignField: "_id",
                as: "questions"
            });
        // console.log();

        return contest[0].questions;
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
            $set : { started: true }
        }).exec();
        console.log("cron", now, contests)
        contests.forEach(c => {
            const publish = {
                listenContestStart: { 
                    id: c._id,
                    name: c.name,
                    timeStart: c.timeStart,
                    createBy: c.createBy,
                    started: c.started
                 }
            }
            this.pubSub.publish(`CONTEST_START: ${c._id}`, publish);
            const counter = new Counter(this, c);
            counter.start();
        })
    }

}

class Counter {

    // contest: Contest

    constructor(
        private readonly contestService: ContestService,
        private contest: Contest
    ) { }

    async start() {
        console.log("start");
        
        const questions = await this.contestService.getQuestionOfContest(this.contest._id);
        for (let index = 0; index < questions.length; index++) {
            // const element = questions[index];
            console.log(index, questions[index]);
            await this.sleep(10*1000);
        }
        // questions.forEach(async (question, index) => {
        //     await this.sleep(10*1000);
        //     console.log(index, question);
        // })
    }

    async sleep(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

}
