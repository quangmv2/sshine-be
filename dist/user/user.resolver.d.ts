import { User } from 'src/graphql';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    hello(): Promise<string>;
    getUser(context: any): Promise<User>;
}
