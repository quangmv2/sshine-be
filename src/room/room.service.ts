import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room.interface';
import { BookRoomInputDTO } from 'src/dto/room.dto';
import * as randomstring from "randomstring";

@Injectable()
export class RoomService {

    constructor(
        @InjectModel('Room') private readonly roomModel: Model<Room>,
    ){}
    

    async registerRoom(input: BookRoomInputDTO, user_id: string): Promise<Room> {
        console.log(randomstring.generate());
        input.code = `${randomstring.generate({length: 4, charset: 'numeric'})}-${randomstring.generate({length: 4, charset: 'numeric'})}-${randomstring.generate({length: 4, charset: 'numeric'})}`; 
        input.user_customer_id = user_id;
        const room = new  this.roomModel(input);
        return room.save();
    }

    async getRoomOfUser(user_id: string): Promise<Room[]> {
        const rooms = await this.roomModel.find({
            user_id
        }).sort({createdAt: -1});
        return rooms;
    }

}
