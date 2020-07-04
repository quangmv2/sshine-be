import { Resolver, Args, Query, ResolveField, Parent, Subscription } from '@nestjs/graphql';
import { Post } from './post.interface';
import { PostService } from './post.service';
import { User } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';

@Resolver('Post')
export class PostResolver {

    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService,

    ){}

    @Query('post')
    async getPost(@Args('id_post') id: string): Promise<Post> {
        return this.postService.getPostById(id);
    }

    @Query('posts')
    async getPosts(@Args('page') page: number, @Args('limit') limit: number) {
        if (!page) page = 1;
        if (!limit) limit = 5;
        return this.postService.getPostPaginate(page, limit);
    }

    @Subscription('listenNewPost')
    async listenNewPost() {
        return this.postService.listenNewPost();
    }

    @ResolveField('user')
    async getUserOfPost(@Parent() parent): Promise<User> {
        const { user } = parent;
        return this.userService.getUserById(user);
    }

}
