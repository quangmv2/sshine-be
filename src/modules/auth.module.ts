import { Module, Global } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthResolver } from '../resolver/auth.resolver';
import { MongooseModule } from "@nestjs/mongoose";
import { TokenSchema } from '../schema/auth.schema';
import { UserModule } from 'src/modules/user.module';

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
