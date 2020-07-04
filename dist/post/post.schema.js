"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeSchema = exports.likeSchema = exports.CommentSchema = exports.commentSchema = exports.PostSchema = exports.postSchema = void 0;
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
exports.postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    comments: { type: [String] },
    likes: { type: [String] },
    user: { type: String },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.postSchema.plugin(mongoosePaginate);
exports.PostSchema = {
    name: "Post",
    schema: exports.postSchema,
    collection: "posts"
};
exports.commentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.CommentSchema = {
    name: "Comment",
    schema: exports.commentSchema,
    collection: "Comments"
};
exports.likeSchema = new mongoose.Schema({
    user: { type: String, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: {
        createdAt: "created)At",
        updatedAt: "updatedAt"
    }
});
exports.LikeSchema = {
    name: "Like",
    schema: exports.likeSchema,
    collection: "likes"
};
//# sourceMappingURL=post.schema.js.map