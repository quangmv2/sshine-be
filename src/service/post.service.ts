// import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
// import { PostInputDTO } from 'src/dto/post.dto';
// import { Post } from './post.interface';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model, PaginateModel } from 'mongoose';
// import { v4 as uuid } from "uuid";
// import * as imageType from "image-type";
// import { join } from "path";
// import { createWriteStream, existsSync, mkdirSync } from 'fs';
// import { PubSub } from 'graphql-subscriptions';

// @Injectable()
// export class PostService {

//     constructor(
//         @InjectModel('Post') private readonly postPaginateModel: PaginateModel<Post>, 
//         @InjectModel('Post') private readonly postModel: Model<Post>,
//         @Inject('PUB_SUB_POST') private readonly pubSub: PubSub, 
//     ){}

//     async addPost(input: PostInputDTO, image): Promise<Post> {
//         console.log(input);
        
//         if (!image) throw new HttpException('Unsupported Media Type SE', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
//         const type = imageType(image.buffer);
//         if (!type) throw new HttpException('Unsupported Media Type SE', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
//         const post = new this.postModel(input);
//         try {
//             const directory = 'images/posts';
//             const idImage = Date.now() + '_' + image.originalname;
//             if (!existsSync('uploads/' + directory)){
//                 console.log(11);
//                 mkdirSync(join('uploads/', directory),  { recursive: true });
//             }
//             const path = join('uploads/' + directory, idImage);
//             const fileWrite = createWriteStream(path);
//             fileWrite.write(image.buffer);
//             fileWrite.end();
//             post.image = directory + '/' + idImage;
//         } catch (error) {
//             throw new HttpException('Error undefine', HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//         await post.save();
        
//         const publish = {};
//         publish["listenNewPost"] = post;
//         this.pubSub.publish('listenNewPost', publish);
//         return post;
//     }

//     async getPostPaginate(page: number, limit: number) {
//         const options = {
//             page,
//             limit,
//             collation: {
//               locale: 'en'
//             },
//             customLabels: myCustomLabels,
//             sort: { createdAt: -1 },
//         };
//         const posts = await this.postPaginateModel.paginate({}, options);
//         return posts;
//     }

//     async getPostById(id: string): Promise<Post> {
//         return this.postModel.findById(id);
//     }

//     async listenNewPost() {
//         return this.pubSub.asyncIterator('listenNewPost');
//     }

//     async likePost(user_id: string, post_id: string): Promise<Post> {
//         const post = await this.postModel.findById(post_id);
//         const exists = post.likes.findIndex(id => user_id === id);
//         if (exists>=0) {
//             await post.updateOne({
//                 $pull: { likes: user_id }
//             });
//         } else {

//             await post.updateOne({
//                 $push: { likes: user_id }
//             });
//         }
        
//         return post;
//     }

// }

// const myCustomLabels = {
//     totalDocs: 'itemCount',
//     docs: 'data',
//     limit: 'limit',
//     page: 'page',
//     nextPage: 'next',
//     prevPage: 'prev',
//     totalPages: 'pageCount',
//     pagingCounter: 'slNo',
// };
