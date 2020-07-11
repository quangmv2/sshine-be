import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([ RoomSchema ]),
  ],
  providers: [RoomService, RoomResolver]
})
export class RoomModule {}
