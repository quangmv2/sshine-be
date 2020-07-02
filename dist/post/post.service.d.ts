import { PostInputDTO } from 'src/dto/post.dto';
import { Post } from './post.interface';
import { Model } from 'mongoose';
export declare class PostService {
    private readonly postModel;
    constructor(postModel: Model<Post>);
    addPost(input: PostInputDTO, image: any): Promise<Post>;
    getPostById(id: string): Promise<Post>;
}
