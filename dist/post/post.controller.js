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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const post_service_1 = require("./post.service");
const auth_guard_1 = require("../guard/auth.guard");
const graphql_1 = require("@nestjs/graphql");
const user_interface_1 = require("../user/user.interface");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async user(context) {
        const { user } = context.req;
        return user;
    }
    async addPost(file, input) {
        return this.postService.addPost(input, file);
    }
};
__decorate([
    common_1.Get(''),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "user", null);
__decorate([
    common_1.Post('add'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "addPost", null);
PostController = __decorate([
    common_1.Controller('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map