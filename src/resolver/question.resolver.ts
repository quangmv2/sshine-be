import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuestionInputDTO } from 'src/dto/question.dto';
import { Question } from "../interfaces/question.interface";
import { Model, PaginateModel, Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { AuthGuardGQL } from 'src/guard/auth.guard';
import { ContestService } from 'src/service/contest.service';
import { Contest } from 'src/interfaces/contest.interface';

@Resolver("Question")
export class QuestionResolver {

    constructor(
        // private readonly userService: UserService,
        private readonly contestService: ContestService,
        @InjectModel("Question") private readonly questionModel: Model<Question>,
    ) { }

    @Mutation()
    @UseGuards(AuthGuardGQL)
    async createOneQuestion(@Args("input") input: CreateQuestionInputDTO, @Context() context): Promise<Question> {
        const { user } = context.req;
        // const contest = await this.contestService.findContest(input.id_contest);
        const question = new this.questionModel(input);
        await question.save();
        // console.log(contest);    
        return question;
    }

    @Query()
    async queryQuestions(): Promise<Question[]> {
        return this.questionModel.find().sort({ 'createdAt': -1 });
    }

    // @Mutation()
    // @UseGuards(AuthGuardGQL)
    // async createManyQuestion(@Args("input") input: CreateQuestionInputDTO[], @Context() context): Promise<Question[]> {
    //     const { user } = context.req;
    //     const contest = await this.contestService.findContest(input.id_contest);
    //     const question = new this.questionModel(input);
    //     await question.save();
    //     console.log(contest);    
    //     return question;
    // }

    // @ResolveField("contest")
    // async contest(@Parent() parent: Question): Promise<Contest> {
    //     return this.contestService.findContest(parent.id_contest);
    // }

    @ResolveField("id")
    async id(@Parent() parent) {
        return !parent._id ? parent.id : ( parent.id ? parent.id : parent._id );
        // return this.userService.getUserById(parent.createBy);
    }

}
