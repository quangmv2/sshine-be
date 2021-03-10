import { CreateQuestionInputDTO } from 'src/dto/question.dto';
import { Question } from "../interfaces/question.interface";
import { Model } from 'mongoose';
import { ContestService } from 'src/service/contest.service';
import { Contest } from 'src/interfaces/contest.interface';
export declare class QuestionResolver {
    private readonly contestService;
    private readonly questionModel;
    constructor(contestService: ContestService, questionModel: Model<Question>);
    createOneQuestion(input: CreateQuestionInputDTO, context: any): Promise<Question>;
    contest(parent: Question): Promise<Contest>;
}
