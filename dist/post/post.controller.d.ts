/// <reference types="mongoose" />
/// <reference types="ts-mongoose-pagination" />
import { Post as Postt } from './post.interface';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    addPost(file: any, input: any, req: any): Promise<Postt>;
    getPost(page: any): Promise<import("mongoose").IPaginateResult<Postt>>;
}
