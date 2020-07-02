import { Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuardGQL } from 'src/guard/auth.guard';
import { User } from 'src/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {

    constructor(
        private readonly userService: UserService
    ){}

    @Query('hello')
    // @UseGuards(AuthGuardGQL)
    async hello(): Promise<string> {
        return "hello";
    }

    @Mutation('user')
    @UseGuards(AuthGuardGQL)
    async getUser(@Context() context): Promise<User> {
        const { user } = context.req;
        return user;
    }

}
