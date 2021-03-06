import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { User } from './user.interface';
@Injectable()
export class UserService {

    constructor(
        @InjectModel("User") private readonly userModel: Model<User>,
        @InjectModel('User') private readonly userPaginateModel: PaginateModel<User>,
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

    async getUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        return user;
    }

    async getUsersPaginate(page: number) {
        const options = {
            page,
            limit: 10,
            collation: {
              locale: 'en'
            },
            customLabels: myCustomLabels,
            sort: { createdAt: -1 },
        };
        const users = await this.userPaginateModel.paginate({}, options);
        return users;
    }

}
const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'data',
    limit: 'limit',
    page: 'page',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
};
