import { Module } from '@nestjs/common';
import { AnswerService } from '../service/answer.service';
import { AnswerResolver } from '../resolver/answer.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerSchema } from 'src/schema/answer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([ AnswerSchema ]),
  ],
  providers: [AnswerService, AnswerResolver]
})
export class AnswerModule {}
