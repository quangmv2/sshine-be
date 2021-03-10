import { Contest, ContestQuestion } from 'src/interfaces/contest.interface';
import { Model } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Question } from 'src/interfaces/question.interface';
export declare class ContestService {
    private readonly pubSub;
    private readonly contestModel;
    private readonly questionModel;
    private readonly contestQuestionModel;
    constructor(pubSub: PubSub, contestModel: Model<Contest>, questionModel: Model<Question>, contestQuestionModel: Model<ContestQuestion>);
    findContest(id: string): Promise<Contest>;
    addQuestion(input: any): Promise<any>;
    listenContestStart(id_contest: string): Promise<AsyncIterator<unknown, any, undefined>>;
    getQuestionOfContest(id_contest: string): Promise<Question[]>;
    checkContestStart(): Promise<void>;
}
