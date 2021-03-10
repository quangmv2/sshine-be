import { Resolver, Query, Mutation, Context, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuardGQL } from 'src/guard/auth.guard';
import { User } from 'src/graphql';
import { UserService } from '../service/user.service';

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

    @Query('users')
    async users(@Args('page') page: number) {
        return this.userService.getUsersPaginate(page);
    }

    @Query('doctors')
    async doctors(@Args('page') page: number) {
        return this.userService.getUsersPaginate(page);
    }

    @Mutation('user')
    @UseGuards(AuthGuardGQL)
    async getUser(@Context() context): Promise<User> {
        const { user } = context.req;
        return user;
    }

}
