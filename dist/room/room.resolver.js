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
exports.MessageDetailResolver = exports.RoomResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const room_dto_1 = require("../dto/room.dto");
const room_service_1 = require("./room.service");
const auth_guard_1 = require("../guard/auth.guard");
const common_1 = require("@nestjs/common");
const message_dto_1 = require("../dto/message.dto");
const user_service_1 = require("../user/user.service");
let RoomResolver = class RoomResolver {
    constructor(roomService, userService) {
        this.roomService = roomService;
        this.userService = userService;
    }
    async rooms(user_id) {
        return this.roomService.getMyRoomOfUser(user_id);
    }
    async myRooms(context) {
        const { user } = context.req;
        const rooms = await this.roomService.getMyRoomOfUser(user.id);
        console.log(rooms);
        return rooms;
    }
    async roomBook(context) {
        const { user } = context.req;
        const rooms = await this.roomService.getMyRoomBookOfUser(user.id);
        console.log(rooms);
        return rooms;
    }
    async roomDetail(room_id) {
        return this.roomService.getRoom(room_id);
    }
    async bookRoom(input, context) {
        const { user } = context.req;
        return this.roomService.registerRoom(input, user.id);
    }
    async sendMessage(input, context) {
        const { user } = context.req;
        return this.roomService.sendMessage(input, user.id, input.to);
    }
    async messageOfRoom(room_id, page) {
        return this.roomService.getMessageOfRoom(room_id, page);
    }
    async confirmRoom(room_id) {
        return this.roomService.confirmRoom(room_id);
    }
    async deleteRoom(room_id) {
        return this.roomService.deleteRoom(room_id);
    }
    async listenNewMessage(context) {
        const user = context.req;
        return this.roomService.listenNewMessage(user.id);
    }
    async listenNewMessageRoom(room_id, context) {
        const user = context.req;
        return this.roomService.listenNewMessageRoom(room_id);
    }
    async listenRoom(context) {
        const user = context.req;
        return this.roomService.listenRoom(user.id);
    }
    async user_customer_id(parent) {
        return this.userService.getUserById(parent.user_customer_id);
    }
    async user_id(parent) {
        return this.userService.getUserById(parent.user_id);
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "rooms", null);
__decorate([
    graphql_1.Query(),
    common_1.UseGuards(auth_guard_1.AuthGuardGQL),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "myRooms", null);
__decorate([
    graphql_1.Query(),
    common_1.UseGuards(auth_guard_1.AuthGuardGQL),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "roomBook", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args("room_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "roomDetail", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(auth_guard_1.AuthGuardGQL),
    __param(0, graphql_1.Args('input')), __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_dto_1.BookRoomInputDTO, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "bookRoom", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(auth_guard_1.AuthGuardGQL),
    __param(0, graphql_1.Args('input')), __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.MessageInputDTO, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "sendMessage", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('room_id')), __param(1, graphql_1.Args('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "messageOfRoom", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('room_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "confirmRoom", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('room_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "deleteRoom", null);
__decorate([
    graphql_1.Subscription(),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "listenNewMessage", null);
__decorate([
    graphql_1.Subscription('listenNewMessageRoom', {
        filter: (payload, variables, context) => {
            if (payload.listenNewMessageRoom.from.id === context.req.id)
                return false;
            return true;
        }
    }),
    __param(0, graphql_1.Args("room_id")), __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "listenNewMessageRoom", null);
__decorate([
    graphql_1.Subscription(),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "listenRoom", null);
__decorate([
    graphql_1.ResolveField('user_customer_id'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "user_customer_id", null);
__decorate([
    graphql_1.ResolveField('user_id'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "user_id", null);
RoomResolver = __decorate([
    graphql_1.Resolver('Room'),
    __metadata("design:paramtypes", [room_service_1.RoomService,
        user_service_1.UserService])
], RoomResolver);
exports.RoomResolver = RoomResolver;
let MessageDetailResolver = class MessageDetailResolver {
    constructor(roomService, userService) {
        this.roomService = roomService;
        this.userService = userService;
    }
    async from(parent) {
        return this.userService.getUserById(parent.from);
    }
};
__decorate([
    graphql_1.ResolveField('from'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageDetailResolver.prototype, "from", null);
MessageDetailResolver = __decorate([
    graphql_1.Resolver('MessageDetail'),
    __metadata("design:paramtypes", [room_service_1.RoomService,
        user_service_1.UserService])
], MessageDetailResolver);
exports.MessageDetailResolver = MessageDetailResolver;
//# sourceMappingURL=room.resolver.js.map