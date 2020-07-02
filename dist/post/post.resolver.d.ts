import { Post } from './post.interface';
import { PostService } from './post.service';
export declare class PostResolver {
    private readonly postService;
    constructor(postService: PostService);
    getPost(id: string): Promise<Post>;
}
