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
        return this.roomService.getRoomOfUser(user.id);
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
    
    @Mutation('sendMessage')
    @UseGuards(AuthGuardGQL)
    async sendMessage(@Args('input') input: MessageInputDTO, @Context() context) {
        const { user } = context.req;
        return this.roomService.sendMessage(input, user.id, input.to);
    }

    @Subscription('listenNewMessage')
    async listenNewMessage(@Context() context) {
        const user = context.req;
        return this.roomService.listenNewMessage(user.id);
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
