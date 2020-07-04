import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, CommentSchema, LikeSchema } from './post.schema';
import { UserModule } from 'src/user/user.module';
import { PubSub } from "graphql-subscriptions";

const PubSubPost = {
  provide: 'PUB_SUB_POST',
  useValue: new PubSub()
}

@Module({
  imports: [
    MongooseModule.forFeature([ PostSchema, CommentSchema, LikeSchema ]),
    UserModule,
  ],
  providers: [PostService, PostResolver, PubSubPost],
  controllers: [PostController]
})
export class PostModule {}
