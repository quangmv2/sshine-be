import { Controller, Post, UseInterceptors, UploadedFile, Body, Query, Param, UseGuards, Get } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { Post as Postt } from './post.interface';
import { log } from 'console';
import { PostService } from './post.service';
import { AuthGuard } from "../guard/auth.guard";
import { Context } from '@nestjs/graphql';
import { User } from 'src/user/user.interface';

@Controller('post')
export class PostController {

    constructor(
        private readonly postService: PostService
    ){}

    @Get('')
    @UseGuards(AuthGuard)
    async user(@Context() context): Promise<User> {
        const { user } = context.req;
        return user;
    }

    @Post('add')
    // @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async addPost(@UploadedFile() file, @Body() input): Promise<Postt> {
        // console.log(input);
        return this.postService.addPost(input, file);
    }

}
