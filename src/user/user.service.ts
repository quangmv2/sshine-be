import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
@Injectable()
export class UserService {

    constructor(
        @InjectModel("User") private readonly userModel: Model<User>,
    ){}

    async createUser(input): Promise<User>{
        const user = new this.userModel(input);
        await user.save();
        // this.messageService.createNewRoom(user.id);
        return user;
    }

    async getUserByUserNameOrEmail(username: string): Promise<User> {
        const user = await this.userModel.findOne({
            $or: [
                { username },
                { email: username }
            ]
        }).exec();
        return user;
    }

}
