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
exports.RoomResolver = void 0;
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
        return this.roomService.getRoomOfUser(user_id);
    }
    async myRooms(context) {
        const { user } = context.req;
        return this.roomService.getRoomOfUser(user.id);
    }
    async roomDetail() {
        return null;
    }
    async bookRoom(input, context) {
        const { user } = context.req;
        return this.roomService.registerRoom(input, user.id);
    }
    async sendMessage(input, context) {
        const { user } = context.req;
        return this.roomService.sendMessage(input, user.id, input.to);
    }
    async listenNewMessage(context) {
        const user = context.req;
        return this.roomService.listenNewMessage(user.id);
    }
    async user_customer_id(parent) {
        return this.userService.getUserById(parent.user_customer_id);
    }
    async user_id(parent) {
        return this.userService.getUserById(parent.user_id);
    }
};
__decorate([
    graphql_1.Query('rooms'),
    __param(0, graphql_1.Args('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "rooms", null);
__decorate([
    graphql_1.Query('myRooms'),
    common_1.UseGuards(auth_guard_1.AuthGuardGQL),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "myRooms", null);
__decorate([
    graphql_1.Query('roomDetail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "roomDetail", null);
__decorate([
    graphql_1.Mutation('bookRoom'),
    common_1.UseGuards(auth_guard_1.AuthGuardGQL),
    __param(0, graphql_1.Args('input')), __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_dto_1.BookRoomInputDTO, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "bookRoom", null);
__decorate([
    graphql_1.Mutation('sendMessage'),
    common_1.UseGuards(auth_guard_1.AuthGuardGQL),
    __param(0, graphql_1.Args('input')), __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.MessageInputDTO, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "sendMessage", null);
__decorate([
    graphql_1.Subscription('listenNewMessage'),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "listenNewMessage", null);
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
//# sourceMappingURL=room.resolver.js.map