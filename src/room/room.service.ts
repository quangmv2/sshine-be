import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, Message, TypeMessage } from './room.interface';
import { BookRoomInputDTO } from 'src/dto/room.dto';
import * as randomstring from "randomstring";
import { PubSub } from 'graphql-subscriptions';
import { MessageInputDTO } from 'src/dto/message.dto';
import { errorMonitor } from 'events';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoomService {

    constructor(
        @InjectModel('Room') private readonly roomModel: Model<Room>,
        @Inject('PUB_SUB_MESSAGE') private readonly pubSub: PubSub,
        private readonly userService: UserService,
    ) { }


    async registerRoom(input: BookRoomInputDTO, user_id: string): Promise<Room> {
        // console.log(randomstring.generate());
        input.code = `${randomstring.generate({ length: 4, charset: 'numeric' })}-${randomstring.generate({ length: 4, charset: 'numeric' })}-${randomstring.generate({ length: 4, charset: 'numeric' })}`;
        input.user_customer_id = user_id;
        // input.time_start = input.time_start*10000;
        const room = new this.roomModel({
            ...input,
            time_start: parseInt(input.time_start, 10)
        });
        const publish = {};
        publish["listenRoom"] = "update room";
        this.pubSub.publish(`LISTEN_ROOM: ${user_id}`, publish);
        this.pubSub.publish(`LISTEN_ROOM: ${input.user_id}`, publish);
        return room.save();
    }

    async getRoom(room_id: string): Promise<Room> {
        // console.log(await this.roomModel.findById(room_id));
        return this.roomModel.findById(room_id);
    }

    async getRoomOfUser(user_id: string): Promise<Room[]> {
        // console.log(user_id);

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
    
    async getMyRoomOfUser(user_id: string): Promise<Room[]> {
        const rooms = await this.roomModel.find({
            user_customer_id: user_id,
            status: true
        }).sort({ createdAt: -1 });
        return rooms;
    }

    async getMyRoomBookOfUser(user_id: string): Promise<Room[]> {
        console.log(user_id);
        
        const rooms = await this.roomModel.find({
            user_id: user_id,
        }).sort({ createdAt: -1 });
        return rooms;
    }

    async getMessageOfRoom(room_id, page) {
        let messages = (await this.roomModel.findById(room_id)).messages;
        messages.sort((a, b) => a.createdAt - b.createdAt);
        // messages.reverse();
        messages = messages.slice((messages.length - 1 - page * 10), messages.length);
        // console.log(messages);
        return messages;
    }

    async confirmRoom(room_id: string): Promise<Room> {
        await this.roomModel.updateOne({
            _id: room_id
        },{
            status: true
        });
        let room = await this.roomModel.findById(room_id);
        const publish = {};
        publish["listenRoom"] = "update room";
        this.pubSub.publish(`LISTEN_ROOM: ${room.user_customer_id}`, publish);
        return room;
    }

    async deleteRoom(room_id: string): Promise<string> {
        await this.roomModel.deleteOne({ _id: room_id });
        return `success ${Math.random()} `
    }

    async sendMessage(input: MessageInputDTO, user_id, room_id) {
        const room: Room = await this.roomModel.findById(room_id);
        let message: Message = {
            ...input,
            from: user_id,
            type: TypeMessage.send
        }
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
        console.log(room.user_id != user_id);
        
        publish["listenNewMessageRoom"] = publish["listenNewMessage"];
        this.pubSub.publish(`MESSAGE: ${room.user_id != user_id ? room.user_id : room.user_customer_id}`, publish);
        this.pubSub.publish(`MESSAGE_ROOM: ${room_id}`, publish);
        return message;
    }

    async listenNewMessage(user_id) {
        return this.pubSub.asyncIterator(`MESSAGE: ${user_id}`);
    }

    async listenNewMessageRoom(room_id) {
        return this.pubSub.asyncIterator(`MESSAGE_ROOM: ${room_id}`);
    }

    async listenRoom(user_id: string) {
        return this.pubSub.asyncIterator(`LISTEN_ROOM: ${user_id}`);
    } 

}
