import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './room.schema';
import { PubSub } from 'graphql-subscriptions';
import { UserModule } from 'src/user/user.module';

const PubSubMessage = {
  provide: 'PUB_SUB_MESSAGE',
  useValue: new PubSub()
}

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([ RoomSchema ]),
  ],
  providers: [RoomService, RoomResolver, PubSubMessage]
})
export class RoomModule {}
