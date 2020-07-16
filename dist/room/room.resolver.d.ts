import { Room } from './room.interface';
import { BookRoomInputDTO } from 'src/dto/room.dto';
import { RoomService } from './room.service';
import { MessageInputDTO } from 'src/dto/message.dto';
import { UserService } from 'src/user/user.service';
export declare class RoomResolver {
    private readonly roomService;
    private readonly userService;
    constructor(roomService: RoomService, userService: UserService);
    rooms(user_id: string): Promise<Room[]>;
    myRooms(context: any): Promise<Room[]>;
    roomDetail(): Promise<Room>;
    bookRoom(input: BookRoomInputDTO, context: any): Promise<Room>;
    sendMessage(input: MessageInputDTO, context: any): Promise<import("./room.interface").Message>;
    listenNewMessage(context: any): Promise<AsyncIterator<unknown, any, undefined>>;
    user_customer_id(parent: any): Promise<import("../user/user.interface").User>;
    user_id(parent: any): Promise<import("../user/user.interface").User>;
}
