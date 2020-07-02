import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PostInputDTO } from 'src/dto/post.dto';
import { Post } from './post.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from "uuid";
import * as imageType from "image-type";
import { join } from "path";
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Injectable()
export class PostService {

    constructor(
        @InjectModel('Post') private readonly postModel: Model<Post>, 
    ){}

    async addPost(input: PostInputDTO, image): Promise<Post> {
        if (!image) throw new HttpException('Unsupported Media Type SE', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        const type = imageType(image.buffer);
        if (!type) throw new HttpException('Unsupported Media Type SE', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        const post = new this.postModel(input);
        try {
            const directory = 'images/posts';
            const idImage = Date.now() + '_' + image.originalname;
            if (!existsSync('/tmp/' + directory)){
                console.log(11);
                mkdirSync(join('/tmp/', directory),  { recursive: true });
            }
            const path = join('/tmp/' + directory, idImage);
            const fileWrite = createWriteStream(path);
            fileWrite.write(image.buffer);
            fileWrite.end();
            post.image = directory + idImage;
        } catch (error) {
            throw new HttpException('Error undefine', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return post.save();
    }

    async getPostById(id: string): Promise<Post> {
        return this.postModel.findById(id);
    }

}
