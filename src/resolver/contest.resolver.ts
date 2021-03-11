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
import { RoleGuard } from 'src/guard/role.guard';
import { ROLE } from 'src/utils';

@Resolver("Contest")
export class ContestResolver {

    constructor(
        private readonly userService: UserService,
        private readonly contestService: ContestService,
        @InjectModel("Contest") private readonly contestModel: Model<Contest>,
    ) { }

    @Mutation()
    @UseGuards(AuthGuardGQL)
    // @UseGuards(new RoleGuard([ROLE.ADMIN, ROLE.SUPER_ADMIN]))
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
    async toggleQuestionToContest(@Args("input") input) {
        return this.contestService.addQuestion(input);
    }

    @Mutation()
    async removeContest(@Args("input") id_contest: string) {
        const contest = await this.contestModel.findById(id_contest);
        if (!contest) return null;
        await contest.remove();
        return contest;
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

    @Query()
    async contests(): Promise<Contest[]>{
        return this.contestModel.find().sort({ timeStart: 1 });
    }

    @Subscription('listenContestStart', {
        filter: (payload, variables, context) => {
            console.log(payload, variables, context);
            return true;
        }
    })
    async listenContestStart(@Args("id") id) {
        // return null;
        return this.contestService.listenContestStart(id);
    }

    @ResolveField('createBy')
    async createBy(@Parent() parent) {
        console.log(parent);
        return this.userService.getUserById(parent.createBy);
    }

}

@Resolver("DataStreamContest")
export class DataStreamContestResolver {

    @ResolveField('question')
    async createBy(@Parent() parent) {
        console.log(parent);
        return null;
        // return this.userService.getUserById(parent.createBy);
    }

}