import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule, Context } from "@nestjs/graphql";
import { join } from "path";
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { RoomModule } from './modules/room.module';
import { AppGateway } from './app.gateway';
import { GqlModuleConfig } from './grapqlConfigModule';
import { QuestionModule } from './modules/question.module';
import { ContestModule } from './modules/contest.module';
import { AnswerModule } from './modules/answer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync({
      imports: [AuthModule],
      useClass: GqlModuleConfig,
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
    // RoomModule,
    QuestionModule,
    ContestModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
