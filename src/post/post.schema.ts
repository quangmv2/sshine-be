import * as mongoose from 'mongoose';
import {mongoosePagination} from "ts-mongoose-pagination";
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const postSchema = new mongoose.Schema({
    
    title: { type: String, required:true },
    content: { type: String,  required: true },
    image: { type: String },
    comments: { type: [String] },
    likes: { type: [String] },
    user: { type: String },
    createdAt: { type: Number },
    updatedAt: { type: Number }
    
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});

postSchema.plugin(mongoosePaginate);

export const PostSchema = {
    name: "Post",
    schema: postSchema,
    collection: "posts"
}

export const commentSchema = new mongoose.Schema({
    
    user: { type: String, required:true },
    content: { type: String,  required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number }
    
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});

export const CommentSchema = {
    name: "Comment",
    schema: commentSchema,
    collection: "Comments"
}

export const likeSchema = new mongoose.Schema({
    
    user: { type: String, required:true },
    createdAt: { type: Number },
    updatedAt: { type: Number }
    
},
{
    timestamps: {
        createdAt: "created)At",
        updatedAt: "updatedAt"
    }
});

export const LikeSchema = {
    name: "Like",
    schema: likeSchema,
    collection: "likes"
}