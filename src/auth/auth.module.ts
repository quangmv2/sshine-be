import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from "@nestjs/mongoose";
import { TokenSchema } from './auth.schema';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([TokenSchema]),
    UserModule
  ],
  providers: [AuthService, AuthResolver],
  exports: [AuthService]
})
export class AuthModule {}
