"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModule = void 0;
const common_1 = require("@nestjs/common");
const room_service_1 = require("./room.service");
const room_resolver_1 = require("./room.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const room_schema_1 = require("./room.schema");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const user_module_1 = require("../user/user.module");
const PubSubMessage = {
    provide: 'PUB_SUB_MESSAGE',
    useValue: new graphql_subscriptions_1.PubSub()
};
let RoomModule = class RoomModule {
};
RoomModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            mongoose_1.MongooseModule.forFeature([room_schema_1.RoomSchema]),
        ],
        providers: [room_service_1.RoomService, room_resolver_1.RoomResolver, PubSubMessage]
    })
], RoomModule);
exports.RoomModule = RoomModule;
//# sourceMappingURL=room.module.js.map