import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, Message } from './room.interface';
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
    ){}
    

    async registerRoom(input: BookRoomInputDTO, user_id: string): Promise<Room> {
        console.log(randomstring.generate());
        input.code = `${randomstring.generate({length: 4, charset: 'numeric'})}-${randomstring.generate({length: 4, charset: 'numeric'})}-${randomstring.generate({length: 4, charset: 'numeric'})}`; 
        input.user_customer_id = user_id;
        console.log(input);
        
        const room = new this.roomModel(input);
        return room.save();
    }

    async getRoomOfUser(user_id: string): Promise<Room[]> {
        console.log(user_id);
        
        const rooms = await this.roomModel.find({
            $or: [
                {
                    user_id
                },
                {
                    user_customer_id: user_id
                }
            ]
        }).sort({createdAt: -1});
        return rooms;
    }

    async sendMessage(input: MessageInputDTO, user_id, room_id) {
        const room: Room = await this.roomModel.findById(room_id);
        let message: Message = {
            ...input,
            from: user_id
        }
        // return room.messages;
        
        room.messages.push(message);
        await room.save();
        console.log(room);
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
        console.log(publish);
        
        this.pubSub.publish(`MESSAGE: ${room.user_id===user_id?user_id:room.user_customer_id}`, publish);
        return message;
    }

    async listenNewMessage(user_id) {
        return this.pubSub.asyncIterator(`MESSAGE: ${user_id}`);
    }

}
