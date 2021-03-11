import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { CreateContestInputDTO, UpdateContestInputDTO } from 'src/dto/contest.dto';
import { Answer, Contest } from '../interfaces/contest.interface';
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
import { AnswerInput } from "../graphql";
import * as _ from "lodash";
import { ApolloError } from 'apollo-server-express';

@Resolver("Contest")
export class ContestResolver {

    constructor(
        private readonly userService: UserService,
        private readonly contestService: ContestService,
        @InjectModel("Contest") private readonly contestModel: Model<Contest>,
        @InjectModel("Answer") private readonly answerModel: Model<Answer>,
        @InjectModel("Question") private readonly questionModel: Model<Question>,
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

        const contest = await this.contestModel.findByIdAndUpdate(input.id, {
            $set: { ...input }
        });
        return contest;
    }

    @Mutation()
    async toggleQuestionToContest(@Args("input") input) {
        return this.contestService.addQuestion(input);
    }

    @Mutation()
    async toggleUserToContest(@Args("input") input) {
        return this.contestService.toogleUserToContets(input);
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

    @Mutation('userOfContest')
    async userOfContestMutation(@Args("id_contest") id_contest: string): Promise<User[]> {
        const contest = await this.contestModel.findById(id_contest);
        if (!contest) return [];
        return this.userService.getUsers(contest.id_users);
    }

    @Mutation('questionOfContest')
    async questionOfContestMutation(@Args("id_contest") id_contest: string): Promise<Question[]> {
        const questions = await this.contestService.getQuestionOfContest(id_contest);
        return questions
    }

    @Mutation()
    @UseGuards(AuthGuardGQL)
    async answer(@Args("input") input: AnswerInput, @Context() context) {
        const { user } = context.req;
        const contest = await this.contestModel.findById(input.id_contest);
        if (!contest || contest.id_questions_reject.findIndex(c => c == input.id_question) > -1 || !contest.started
            || contest.id_users.findIndex(c => c == user.id) < 0 || contest.id_users_reject.findIndex(c => c == user.id) > -1
        ) throw new ApolloError("Error", "FORBIDDEN");

        try {
            await this.answerModel.updateOne({
                $and: [
                    {
                        id_contest: input.id_contest
                    },
                    {
                        id_question: input.id_question
                    },
                    {
                        id_user: user.id
                    }
                ]
            }, {
                id_contest: input.id_contest,
                id_question: input.id_question,
                id_user: user.id,
                answer: input.answer
            }, {
                new: true,
                upsert: true
            });
            return input.answer;
        } catch (error) {
            return -1
        }
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

    @Mutation()
    async contest(@Args("id_contest") id_contest: string) {
        return this.contestModel.findById(id_contest);
    }

    @Query()
    async contests(): Promise<Contest[]> {
        return this.contestModel.find().sort({ 'timeStart': -1 });
    }

    @Subscription('listenContestStart', {
        filter: (payload, variables, context) => {
            console.log(payload, variables, context);
            if (payload && payload.user_id) {
                if (context && context.req && context.req.user)
                    return context.req.user.id == payload.user_id
                return false;
            }
            return true;
        }
    })
    async listenContestStart(@Args("input") input) {
        // return null;
        const { id_contest } = input
        return this.contestService.listenContestStart(id_contest);
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