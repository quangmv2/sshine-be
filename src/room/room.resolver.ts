import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Room } from './room.interface';
import { BookRoomInputDTO } from 'src/dto/room.dto';
import { RoomService } from './room.service';

@Resolver('Room')
export class RoomResolver {

    constructor(
        private readonly roomService: RoomService
    ){}

    @Query('rooms')
    async rooms(@Args('user_id') user_id: string): Promise<Room[]> {
        return this.roomService.getRoomOfUser(user_id);
    }

    @Query('roomDetail')
    async roomDetail(): Promise<Room> {
        return null;
    }

    @Mutation('bookRoom')
    async bookRoom(@Args('input') input: BookRoomInputDTO): Promise<Room>{
        return this.roomService.registerRoom(input);
    }

}
