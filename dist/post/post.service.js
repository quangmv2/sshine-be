"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const post_dto_1 = require("../dto/post.dto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const imageType = require("image-type");
const path_1 = require("path");
const fs_1 = require("fs");
let PostService = class PostService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async addPost(input, image) {
        if (!image)
            throw new common_1.HttpException('Unsupported Media Type SE', common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        const type = imageType(image.buffer);
        if (!type)
            throw new common_1.HttpException('Unsupported Media Type SE', common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        const post = new this.postModel(input);
        try {
            const directory = 'images/posts';
            const idImage = Date.now() + '_' + image.originalname;
            if (!fs_1.existsSync('/tmp/' + directory)) {
                console.log(11);
                fs_1.mkdirSync(path_1.join('/tmp/', directory), { recursive: true });
            }
            const path = path_1.join('/tmp/' + directory, idImage);
            const fileWrite = fs_1.createWriteStream(path);
            fileWrite.write(image.buffer);
            fileWrite.end();
            post.image = directory + idImage;
        }
        catch (error) {
            throw new common_1.HttpException('Error undefine', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return post.save();
    }
    async getPostById(id) {
        return this.postModel.findById(id);
    }
};
PostService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Post')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map