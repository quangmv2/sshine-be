import { Resolver, Query, Mutation, Context, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuardGQL } from 'src/guard/auth.guard';
import { User } from 'src/graphql';
import { UserService } from '../service/user.service';
import { RegisterInputDTO } from 'src/dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Resolver()
export class UserResolver {

    constructor(
        private readonly userService: UserService
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

    @Mutation('user')
    @UseGuards(AuthGuardGQL)
    async getUser(@Context() context): Promise<User> {
        const { user } = context.req;
        console.log(user);
        return user;
    }

    @Mutation()
    async createUser(@Args("input") input: RegisterInputDTO) {
        console.log(input);
        return this.userService.createUser({
            ...input,
            password: bcrypt.hashSync(input.password, 10)
        });
    }



}
