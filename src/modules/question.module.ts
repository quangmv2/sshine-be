import { Module } from '@nestjs/common';
import { QuestionService } from '../service/question.service';
import { QuestionResolver } from '../resolver/question.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from 'src/schema/question.schema';
import { ContestModule } from './contest.module';

@Module({
  imports: [
    MongooseModule.forFeature([ QuestionSchema ]),
    ContestModule
  ],
  providers: [QuestionService, QuestionResolver]
})
export class QuestionModule {}
