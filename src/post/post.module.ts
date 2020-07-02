import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, CommentSchema, LikeSchema } from './post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([ PostSchema, CommentSchema, LikeSchema ]),
  ],
  providers: [PostService, PostResolver],
  controllers: [PostController]
})
export class PostModule {}
