import { Contest } from 'src/interfaces/contest.interface';
import { Model } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Question } from 'src/interfaces/question.interface';
export declare class ContestService {
    private readonly pubSub;
    private readonly contestModel;
    constructor(pubSub: PubSub, contestModel: Model<Contest>);
    findContest(id: string): Promise<Contest>;
    listenContestStart(id_contest: string): Promise<AsyncIterator<unknown, any, undefined>>;
    getQuestionOfContest(id_contest: string): Promise<Question[]>;
    checkContestStart(): Promise<void>;
}
