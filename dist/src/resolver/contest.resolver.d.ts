import { CreateContestInputDTO, UpdateContestInputDTO } from 'src/dto/contest.dto';
import { Contest } from '../interfaces/contest.interface';
import { ContestService } from 'src/service/contest.service';
import { Model } from 'mongoose';
import { UserService } from 'src/service/user.service';
import { User } from 'src/interfaces/user.interface';
export declare class ContestResolver {
    private readonly userService;
    private readonly contestService;
    private readonly contestModel;
    constructor(userService: UserService, contestService: ContestService, contestModel: Model<Contest>);
    createContest(input: CreateContestInputDTO, context: any): Promise<Contest>;
    updateContest(input: UpdateContestInputDTO): Promise<Contest>;
    userOfContest(id_contest: string): Promise<User[]>;
    myContest(context: any): Promise<Contest[]>;
    listenContestStart(id: string): Promise<AsyncIterator<unknown, any, undefined>>;
    createBy(parent: any): Promise<User>;
}
