import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contest } from 'src/interfaces/contest.interface';
import { Model, PaginateModel, Types } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Cron } from '@nestjs/schedule';
import { Question } from 'src/interfaces/question.interface';

@Injectable()
export class ContestService {

    constructor(
        // private readonly userService: UserService,
        // private readonly contestService: ContestService,
        @Inject('PUB_SUB_MESSAGE') private readonly pubSub: PubSub,
        @InjectModel("Contest") private readonly contestModel: Model<Contest>,
    ) { }

    async findContest(id: string): Promise<Contest> {
        return this.contestModel.findById(id);
    }

    //     async listenNewMessage(user_id) {
//         return this.pubSub.asyncIterator(`MESSAGE: ${user_id}`);
//     }

    async listenContestStart(id_contest: string) {
        return this.pubSub.asyncIterator(`CONTEST_START: ${id_contest}`);
    }

    async getQuestionOfContest(id_contest: string): Promise<Question[]> {
        return []
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
        })
    }

}

class Counter {
    
    // contest: Contest
    
    constructor(
        private readonly contestService: ContestService,
        contest: Contest
    ) {}

    async start() {

    }

}
