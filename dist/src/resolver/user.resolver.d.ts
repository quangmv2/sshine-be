/// <reference types="mongoose" />
/// <reference types="ts-mongoose-pagination" />
import { User } from 'src/graphql';
import { UserService } from '../service/user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    hello(): Promise<string>;
    users(page: number): Promise<import("mongoose").IPaginateResult<import("../interfaces/user.interface").User>>;
    doctors(page: number): Promise<import("mongoose").IPaginateResult<import("../interfaces/user.interface").User>>;
    getUser(context: any): Promise<User>;
}
