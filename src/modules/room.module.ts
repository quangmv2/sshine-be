// import { Module } from '@nestjs/common';
// import { RoomService } from '../service/room.service';
// import { RoomResolver, MessageDetailResolver } from './room.resolver';
// import { MongooseModule } from '@nestjs/mongoose';
// import { RoomSchema } from '../schema/room.schema';
// import { PubSub } from 'graphql-subscriptions';
// import { UserModule } from 'src/modules/user.module';

// const PubSubMessage = {
//   provide: 'PUB_SUB_MESSAGE',
//   useValue: new PubSub()
// }

// @Module({
//   imports: [
//     UserModule,
//     MongooseModule.forFeature([ RoomSchema ]),
//   ],
//   providers: [RoomService, RoomResolver, PubSubMessage, MessageDetailResolver]
// })
// export class RoomModule {}
