/// <reference types="ts-mongoose-pagination" />
import { PostInputDTO } from 'src/dto/post.dto';
import { Post } from './post.interface';
import { Model, PaginateModel } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
export declare class PostService {
    private readonly postPaginateModel;
    private readonly postModel;
    private readonly pubSub;
    constructor(postPaginateModel: PaginateModel<Post>, postModel: Model<Post>, pubSub: PubSub);
    addPost(input: PostInputDTO, image: any): Promise<Post>;
    getPostPaginate(page: number, limit: number): Promise<import("mongoose").IPaginateResult<Post>>;
    getPostById(id: string): Promise<Post>;
    listenNewPost(): Promise<AsyncIterator<unknown, any, undefined>>;
}
