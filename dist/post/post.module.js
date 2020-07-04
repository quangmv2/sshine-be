"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_resolver_1 = require("./post.resolver");
const post_controller_1 = require("./post.controller");
const mongoose_1 = require("@nestjs/mongoose");
const post_schema_1 = require("./post.schema");
const user_module_1 = require("../user/user.module");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const PubSubPost = {
    provide: 'PUB_SUB_POST',
    useValue: new graphql_subscriptions_1.PubSub()
};
let PostModule = class PostModule {
};
PostModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([post_schema_1.PostSchema, post_schema_1.CommentSchema, post_schema_1.LikeSchema]),
            user_module_1.UserModule,
        ],
        providers: [post_service_1.PostService, post_resolver_1.PostResolver, PubSubPost],
        controllers: [post_controller_1.PostController]
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map