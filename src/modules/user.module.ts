import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserResolver } from '../resolver/user.resolver';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, userSchema } from '../schema/user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([ UserSchema ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
