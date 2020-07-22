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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const room_interface_1 = require("./room.interface");
const room_dto_1 = require("../dto/room.dto");
const randomstring = require("randomstring");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const message_dto_1 = require("../dto/message.dto");
const user_service_1 = require("../user/user.service");
let RoomService = class RoomService {
    constructor(roomModel, pubSub, userService) {
        this.roomModel = roomModel;
        this.pubSub = pubSub;
        this.userService = userService;
    }
    async registerRoom(input, user_id) {
        input.code = `${randomstring.generate({ length: 4, charset: 'numeric' })}-${randomstring.generate({ length: 4, charset: 'numeric' })}-${randomstring.generate({ length: 4, charset: 'numeric' })}`;
        input.user_customer_id = user_id;
        console.log(input);
        const room = new this.roomModel(input);
        return room.save();
    }
    async getRoom(room_id) {
        return this.roomModel.findById(room_id);
    }
    async getRoomOfUser(user_id) {
        const rooms = await this.roomModel.find({
            $or: [
                {
                    user_customer_id: user_id
                },
                {
                    user_id: user_id
                }
            ]
        }).sort({ createdAt: -1 });
        return rooms;
    }
    async getMessageOfRoom(room_id, page) {
        let messages = (await this.roomModel.findById(room_id)).messages;
        messages.sort((a, b) => a.createdAt - b.createdAt);
        messages = messages.slice((messages.length - 1 - page * 10), messages.length);
        return messages;
    }
    async sendMessage(input, user_id, room_id) {
        const room = await this.roomModel.findById(room_id);
        let message = Object.assign(Object.assign({}, input), { from: user_id, type: room_interface_1.TypeMessage.send });
        room.messages.push(message);
        await room.save();
        message = room.messages[room.messages.length - 1];
        const publish = {};
        publish["listenNewMessage"] = {
            id: message.id,
            type: message.type,
            content: message.content,
            status: message.status,
            from: await this.userService.getUserById(message.from),
            to: room
        };
        publish["listenNewMessageRoom"] = publish["listenNewMessage"];
        this.pubSub.publish(`MESSAGE: ${room.user_id === user_id ? user_id : room.user_customer_id}`, publish);
        this.pubSub.publish(`MESSAGE_ROOM: ${room_id}`, publish);
        return message;
    }
    async listenNewMessage(user_id) {
        return this.pubSub.asyncIterator(`MESSAGE: ${user_id}`);
    }
    async listenNewMessageRoom(room_id) {
        return this.pubSub.asyncIterator(`MESSAGE_ROOM: ${room_id}`);
    }
};
RoomService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Room')),
    __param(1, common_1.Inject('PUB_SUB_MESSAGE')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        graphql_subscriptions_1.PubSub,
        user_service_1.UserService])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map