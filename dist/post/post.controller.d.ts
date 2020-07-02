import { Post as Postt } from './post.interface';
import { PostService } from './post.service';
import { User } from 'src/user/user.interface';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    user(context: any): Promise<User>;
    addPost(file: any, input: any): Promise<Postt>;
}
