import { Resolver, Query, Mutation, Context, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuardGQL } from 'src/guard/auth.guard';
// import { User } from 'src/graphql';
import { UserService } from '../service/user.service';
import { RegisterInputDTO } from 'src/dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { ApolloError } from 'apollo-server-express';
import { Model, PaginateModel, Types } from 'mongoose';
import { User } from '../interfaces/user.interface';

@Resolver()
export class UserResolver {

    constructor(
        private readonly userService: UserService,
        @InjectModel("User") private readonly userModel: Model<User>,
    ) { }

    @Query('hello')
    // @UseGuards(AuthGuardGQL)
    async hello(): Promise<string> {
        return "hello";
    }

    @Query('users')
    async users(@Args('page') page: number) {
        return this.userService.getUsersPaginate(page);
    }

    @Query('doctors')
    async doctors(@Args('page') page: number) {
        return this.userService.getUsersPaginate(page);
    }

    @Query()
    @UseGuards(AuthGuardGQL)
    async user(@Context() context): Promise<User> {
        const { user } = context.req;
        return user;
    }

    @Query()
    async getUsers(): Promise<User[]> {
        const users = await this.userService.getUsers();
        console.log(users)
        return users;
    }

    @Mutation()
    async removeUser(@Args("input") input: string) {
        const user = await this.userModel.findById(input);
        if (!user) throw new ApolloError("Not found", "PERSISTED_QUERY_NOT_FOUND")
        await user.remove();
        return null;
    }

    @Mutation('user')
    @UseGuards(AuthGuardGQL)
    async getUser(@Context() context): Promise<User> {
        const { user } = context.req;
        console.log(user);
        return user;
    }

    @Mutation()
    async createUser(@Args("input") input: RegisterInputDTO) {
        // console.log(input);
        return this.userService.createUser({
            ...input,
            password: bcrypt.hashSync(input.password, 10)
        });
    }

    @Mutation()
    @UseGuards(AuthGuardGQL)
    async changePassword(@Args("input") input: string, @Args("id_user") id_user: string, @Context() context) {
        const { user } = context.req;
        if (user.idRole == "SUPER_ADMIN" || user.idRole == "ADMIN") {
            const u = await this.userService.getUserById(id_user);
            if (!u) throw new ApolloError("Nor Found", "PERSISTED_QUERY_NOT_FOUND");
            u.password = bcrypt.hashSync(input, 10)
            u.save();
            return true;
        }
        const u = await this.userService.getUserById(user.id);
        u.password = bcrypt.hashSync(input, 10)
        u.save();
        return true;
    }



}
