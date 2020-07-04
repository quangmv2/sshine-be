import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule, Context } from "@nestjs/graphql";
import { join } from "path";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      context: context => {
        const {req, connection} = context;
        if (connection) return {
            req: connection.context
        }
        return context;
      },
      installSubscriptionHandlers: true
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DB_URI + process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
    }),
    AuthModule,
    UserModule,
    PostModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
