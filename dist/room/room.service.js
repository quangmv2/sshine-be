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
const room_dto_1 = require("../dto/room.dto");
const randomstring = require("randomstring");
let RoomService = class RoomService {
    constructor(roomModel) {
        this.roomModel = roomModel;
    }
    async registerRoom(input, user_id) {
        console.log(randomstring.generate());
        input.code = `${randomstring.generate({ length: 4, charset: 'numeric' })}-${randomstring.generate({ length: 4, charset: 'numeric' })}-${randomstring.generate({ length: 4, charset: 'numeric' })}`;
        input.user_customer_id = user_id;
        const room = new this.roomModel(input);
        return room.save();
    }
    async getRoomOfUser(user_id) {
        const rooms = await this.roomModel.find({
            user_id
        }).sort({ createdAt: -1 });
        return rooms;
    }
};
RoomService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Room')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map