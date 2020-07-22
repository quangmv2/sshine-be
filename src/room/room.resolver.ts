import { Resolver, Query, Mutation, Args, Context, Subscription, ResolveField, Parent } from '@nestjs/graphql';
import { Room } from './room.interface';
import { BookRoomInputDTO } from 'src/dto/room.dto';
import { RoomService } from './room.service';
import { AuthGuardGQL } from 'src/guard/auth.guard';
import { UseGuards } from '@nestjs/common';
import { MessageInputDTO } from 'src/dto/message.dto';
import { UserService } from 'src/user/user.service';

@Resolver('Room')
export class RoomResolver {

    constructor(
        private readonly roomService: RoomService,
        private readonly userService: UserService,
    ){}

    @Query('rooms')
    async rooms(@Args('user_id') user_id: string): Promise<Room[]> {
        return this.roomService.getRoomOfUser(user_id);
    }
    
    @Query('myRooms')
    @UseGuards(AuthGuardGQL)
    async myRooms(@Context() context): Promise<Room[]> {
        const { user } = context.req;
        const rooms: Room[] = await this.roomService.getRoomOfUser(user.id);
        console.log(rooms);
        return rooms;
        
    }

    @Query('roomDetail')
    async roomDetail(@Args("room_id") room_id: string): Promise<Room> {
        return this.roomService.getRoom(room_id);
    }

    @Mutation('bookRoom')
    @UseGuards(AuthGuardGQL)
    async bookRoom(@Args('input') input: BookRoomInputDTO, @Context() context): Promise<Room>{
        const { user } = context.req;
        return this.roomService.registerRoom(input, user.id);
    }
    
    @Mutation('sendMessage')
    @UseGuards(AuthGuardGQL)
    async sendMessage(@Args('input') input: MessageInputDTO, @Context() context) {
        const { user } = context.req;
        return this.roomService.sendMessage(input, user.id, input.to);
    }

    @Mutation('messageOfRoom')
    async messageOfRoom(@Args('room_id') room_id: string, @Args('page') page: number) {
        // console.log(room_id, page);
        
        return this.roomService.getMessageOfRoom(room_id, page);
    }

    @Subscription('listenNewMessage')
    async listenNewMessage(@Context() context) {
        const user = context.req;
        return this.roomService.listenNewMessage(user.id);
    }
    
    @Subscription('listenNewMessageRoom', {
        filter: (payload, variables, context) => {
            if (payload.listenNewMessageRoom.from.id === context.req.id) return false
            return  true;
        }
    })
    async listenNewMessageRoom(@Args("room_id") room_id: string, @Context() context) {
        const user = context.req;
        return this.roomService.listenNewMessageRoom(room_id);
    }

    @ResolveField('user_customer_id')
    async user_customer_id(@Parent() parent) {
        return this.userService.getUserById(parent.user_customer_id);
    }

    @ResolveField('user_id')
    async user_id(@Parent() parent) {
        return this.userService.getUserById(parent.user_id);
    }

}

@Resolver('MessageDetail')
export class MessageDetailResolver {

    constructor(
        private readonly roomService: RoomService,
        private readonly userService: UserService,
    ){}

    @ResolveField('from')
    async from(@Parent() parent) {
        return this.userService.getUserById(parent.from);
    }
}