import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Room } from './room.interface';
import { BookRoomInputDTO } from 'src/dto/room.dto';
import { RoomService } from './room.service';
import { AuthGuardGQL } from 'src/guard/auth.guard';
import { UseGuards } from '@nestjs/common';

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
    @UseGuards(AuthGuardGQL)
    async bookRoom(@Args('input') input: BookRoomInputDTO, @Context() context): Promise<Room>{
        const { user } = context.req;
        return this.roomService.registerRoom(input, user.id);
    }

}
