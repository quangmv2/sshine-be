import { Resolver, Args, Query } from '@nestjs/graphql';
import { Post } from './post.interface';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {

    constructor(
        private readonly postService: PostService
    ){}

    @Query('post')
    async getPost(@Args('id_post') id: string): Promise<Post> {
        return this.postService.getPostById(id);
    }

}
