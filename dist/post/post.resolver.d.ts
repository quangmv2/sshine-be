/// <reference types="mongoose" />
/// <reference types="ts-mongoose-pagination" />
import { Post } from './post.interface';
import { PostService } from './post.service';
import { User } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';
export declare class PostResolver {
    private readonly postService;
    private readonly userService;
    constructor(postService: PostService, userService: UserService);
    getPost(id: string): Promise<Post>;
    getPosts(page: number, limit: number): Promise<import("mongoose").IPaginateResult<Post>>;
    like(id: string, context: any): Promise<Post>;
    listenNewPost(): Promise<AsyncIterator<unknown, any, undefined>>;
    getUserOfPost(parent: any): Promise<User>;
    getLikeOfPost(parent: any): Promise<any>;
}
