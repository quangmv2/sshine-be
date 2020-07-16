import { Model } from 'mongoose';
import { Room, Message } from './room.interface';
import { BookRoomInputDTO } from 'src/dto/room.dto';
import { PubSub } from 'graphql-subscriptions';
import { MessageInputDTO } from 'src/dto/message.dto';
import { UserService } from 'src/user/user.service';
export declare class RoomService {
    private readonly roomModel;
    private readonly pubSub;
    private readonly userService;
    constructor(roomModel: Model<Room>, pubSub: PubSub, userService: UserService);
    registerRoom(input: BookRoomInputDTO, user_id: string): Promise<Room>;
    getRoomOfUser(user_id: string): Promise<Room[]>;
    sendMessage(input: MessageInputDTO, user_id: any, room_id: any): Promise<Message>;
    listenNewMessage(user_id: any): Promise<AsyncIterator<unknown, any, undefined>>;
}
