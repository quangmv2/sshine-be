import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PostInputDTO } from 'src/dto/post.dto';
import { Post } from './post.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { v4 as uuid } from "uuid";
import * as imageType from "image-type";
import { join } from "path";
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class PostService {

    constructor(
        @InjectModel('Post') private readonly postPaginateModel: PaginateModel<Post>, 
        @InjectModel('Post') private readonly postModel: Model<Post>,
        @Inject('PUB_SUB_POST') private readonly pubSub: PubSub, 
    ){}

    async addPost(input: PostInputDTO, image): Promise<Post> {
        if (!image) throw new HttpException('Unsupported Media Type SE', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        const type = imageType(image.buffer);
        if (!type) throw new HttpException('Unsupported Media Type SE', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        const post = new this.postModel(input);
        post.user = '5ef083f9d3cc0c9994af5b94';
        try {
            const directory = 'images/posts';
            const idImage = Date.now() + '_' + image.originalname;
            if (!existsSync('uploads/' + directory)){
                console.log(11);
                mkdirSync(join('uploads/', directory),  { recursive: true });
            }
            const path = join('uploads/' + directory, idImage);
            const fileWrite = createWriteStream(path);
            fileWrite.write(image.buffer);
            fileWrite.end();
            post.image = directory + '/' + idImage;
        } catch (error) {
            throw new HttpException('Error undefine', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const publish = {};
        publish["listenNewPost"] = post;
        // console.log(publish);
        await post.save();
        this.pubSub.publish('listenNewPost', publish);
        return post;
    }

    async getPostPaginate(page: number, limit: number) {
        const options = {
            page,
            limit,
            collation: {
              locale: 'en'
            },
            customLabels: myCustomLabels,
            sort: { createdAt: -1 },
          };
        const posts = await this.postPaginateModel.paginate({}, options);
        return posts;
    }

    async getPostById(id: string): Promise<Post> {
        return this.postModel.findById(id);
    }

    async listenNewPost() {
        return this.pubSub.asyncIterator('listenNewPost');
    }

}

const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'data',
    limit: 'limit',
    page: 'page',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
};
