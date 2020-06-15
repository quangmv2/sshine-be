import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from "@nestjs/mongoose";
import { TokenSchema } from './auth.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([TokenSchema]),
    UserModule
  ],
  providers: [AuthService, AuthResolver]
})
export class AuthModule {}
