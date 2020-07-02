import { Model } from 'mongoose';
import { User } from './user.interface';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    createUser(input: any): Promise<User>;
    getUserByUserNameOrEmail(username: string): Promise<User>;
    getUserById(id: string): Promise<User>;
}
