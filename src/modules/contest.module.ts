import { forwardRef, Module } from '@nestjs/common';
import { ContestService } from '../service/contest.service';
import { ContestResolver } from '../resolver/contest.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ContestQuestionShema, ContestShema } from 'src/schema/contest.schema';
import { UserModule } from './user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PubSub } from 'graphql-subscriptions';
import { QuestionModule } from './question.module';
import { QuestionSchema } from 'src/schema/question.schema';

const PubSubMessage = {
  provide: 'PUB_SUB_MESSAGE',
  useValue: new PubSub()
}

@Module({
  imports: [
    MongooseModule.forFeature([ ContestShema, ContestQuestionShema, QuestionSchema ]),
    ScheduleModule.forRoot(),
    UserModule,
    forwardRef(() => QuestionModule)
  ],
  providers: [ContestService, ContestResolver, PubSubMessage],
  exports: [ContestService]
})
export class ContestModule {}
