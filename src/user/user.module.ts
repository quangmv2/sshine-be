import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, userSchema } from './user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([ UserSchema ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
