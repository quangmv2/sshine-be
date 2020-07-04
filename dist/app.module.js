"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const post_module_1 = require("./post/post.module");
const room_module_1 = require("./room/room.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                typePaths: ['./**/*.graphql'],
                definitions: {
                    path: path_1.join(process.cwd(), 'src/graphql.ts'),
                    outputAs: 'class',
                },
                context: context => {
                    const { req, connection } = context;
                    if (connection)
                        return {
                            req: connection.context
                        };
                    return context;
                },
                installSubscriptionHandlers: true
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: () => ({
                    uri: process.env.DB_URI + process.env.DB_NAME,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                })
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            post_module_1.PostModule,
            room_module_1.RoomModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map