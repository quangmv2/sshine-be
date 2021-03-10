/// <reference types="ts-mongoose-pagination" />
import { Model, PaginateModel } from 'mongoose';
import { User } from '../interfaces/user.interface';
export declare class UserService {
    private readonly userModel;
    private readonly userPaginateModel;
    constructor(userModel: Model<User>, userPaginateModel: PaginateModel<User>);
    createUser(input: any): Promise<User>;
    getUserByUserNameOrEmail(username: string): Promise<User>;
    getUserById(id: string): Promise<User>;
    getUsersPaginate(page: number): Promise<import("mongoose").IPaginateResult<User>>;
    getUsers(ids: string[]): Promise<User[]>;
}
