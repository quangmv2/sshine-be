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
    roomBook(context: any): Promise<Room[]>;
    roomDetail(room_id: string): Promise<Room>;
    bookRoom(input: BookRoomInputDTO, context: any): Promise<Room>;
    sendMessage(input: MessageInputDTO, context: any): Promise<import("./room.interface").Message>;
    messageOfRoom(room_id: string, page: number): Promise<import("./room.interface").Message[]>;
    confirmRoom(room_id: string): Promise<Room>;
    deleteRoom(room_id: string): Promise<string>;
    listenNewMessage(context: any): Promise<AsyncIterator<unknown, any, undefined>>;
    listenNewMessageRoom(room_id: string, context: any): Promise<AsyncIterator<unknown, any, undefined>>;
    listenRoom(context: any): Promise<AsyncIterator<unknown, any, undefined>>;
    user_customer_id(parent: any): Promise<import("../user/user.interface").User>;
    user_id(parent: any): Promise<import("../user/user.interface").User>;
}
export declare class MessageDetailResolver {
    private readonly roomService;
    private readonly userService;
    constructor(roomService: RoomService, userService: UserService);
    from(parent: any): Promise<import("../user/user.interface").User>;
}
