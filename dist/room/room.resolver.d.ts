import { Room } from './room.interface';
import { BookRoomInputDTO } from 'src/dto/room.dto';
import { RoomService } from './room.service';
export declare class RoomResolver {
    private readonly roomService;
    constructor(roomService: RoomService);
    rooms(user_id: string): Promise<Room[]>;
    roomDetail(): Promise<Room>;
    bookRoom(input: BookRoomInputDTO): Promise<Room>;
}
