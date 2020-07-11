import { Model } from 'mongoose';
import { Room } from './room.interface';
import { BookRoomInputDTO } from 'src/dto/room.dto';
export declare class RoomService {
    private readonly roomModel;
    constructor(roomModel: Model<Room>);
    registerRoom(input: BookRoomInputDTO): Promise<Room>;
    getRoomOfUser(user_id: string): Promise<Room[]>;
}
