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
exports.PostResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const post_service_1 = require("./post.service");
const user_interface_1 = require("../user/user.interface");
const user_service_1 = require("../user/user.service");
let PostResolver = class PostResolver {
    constructor(postService, userService) {
        this.postService = postService;
        this.userService = userService;
    }
    async getPost(id) {
        return this.postService.getPostById(id);
    }
    async getPosts(page, limit) {
        if (!page)
            page = 1;
        if (!limit)
            limit = 5;
        return this.postService.getPostPaginate(page, limit);
    }
    async listenNewPost() {
        return this.postService.listenNewPost();
    }
    async getUserOfPost(parent) {
        const { user } = parent;
        return this.userService.getUserById(user);
    }
};
__decorate([
    graphql_1.Query('post'),
    __param(0, graphql_1.Args('id_post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPost", null);
__decorate([
    graphql_1.Query('posts'),
    __param(0, graphql_1.Args('page')), __param(1, graphql_1.Args('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPosts", null);
__decorate([
    graphql_1.Subscription('listenNewPost'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "listenNewPost", null);
__decorate([
    graphql_1.ResolveField('user'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getUserOfPost", null);
PostResolver = __decorate([
    graphql_1.Resolver('Post'),
    __metadata("design:paramtypes", [post_service_1.PostService,
        user_service_1.UserService])
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.resolver.js.map