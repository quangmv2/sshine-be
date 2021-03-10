import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { CreateContestInputDTO, UpdateContestInputDTO } from 'src/dto/contest.dto';
import { Contest } from '../interfaces/contest.interface';
import { ContestService } from 'src/service/contest.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { AuthGuardGQL } from 'src/guard/auth.guard';
import { UserService } from 'src/service/user.service';
import { User } from 'src/interfaces/user.interface';
import { Question } from 'src/interfaces/question.interface';

@Resolver("Contest")
export class ContestResolver {

    constructor(
        private readonly userService: UserService,
        private readonly contestService: ContestService,
        @InjectModel("Contest") private readonly contestModel: Model<Contest>,
    ) { }

    @Mutation()
    @UseGuards(AuthGuardGQL)
    async createContest(@Args("input") input: CreateContestInputDTO, @Context() context): Promise<Contest> {
        const { user } = context.req;

        const contest = new this.contestModel({
            ...input,
            createBy: user._id,
            id_users: []
        });
        await contest.save()
        // console.log(user);
        return contest;
    }

    @Mutation()
    @UseGuards(AuthGuardGQL)
    async updateContest(@Args("input") input: UpdateContestInputDTO): Promise<Contest> {
        console.log(input);
        
        const contest  = await this.contestModel.findByIdAndUpdate(input.id, {
            $set: { ...input }
        });
        return contest;
    }

    @Mutation()
    async addQuestionToContest(@Args("input") input) {
        return this.contestService.addQuestion(input);
    }

    @Query()
    async userOfContest(@Args("id_contest") id_contest: string): Promise<User[]> {
        const contest = await this.contestModel.findById(id_contest);
        if (!contest) return [];
        return this.userService.getUsers(contest.id_users);
    }

    @Query()
    @UseGuards(AuthGuardGQL)
    async myContest(@Context() context): Promise<Contest[]> {
        const { user } = context.req;
        const contests = await this.contestModel.find({
            id_users: { $all: user._id }
        })
        return contests;
    }

    @Query()
    async questionOfContest(@Args("id_contest") id_contest: string): Promise<Question[]> {
        const questions = await this.contestService.getQuestionOfContest(id_contest);
        console.log(questions);
        
        return questions
    }
    @Query()
    async questionOfContestNoAnswer(@Args("id_contest") id_contest: string): Promise<Question[]> {
        const questions = await this.contestService.getQuestionOfContest(id_contest);
        return questions.map(q => {
            delete q.answer;
            return q;
        })
    }

    @Subscription()
    async listenContestStart(@Args("id") id: string) {
        return this.contestService.listenContestStart(id);
    }

    @ResolveField('createBy')
    async createBy(@Parent() parent) {
        console.log(parent);
        return this.userService.getUserById(parent.createBy);
    }

}
