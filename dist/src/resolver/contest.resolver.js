"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const contest_dto_1 = require("../dto/contest.dto");
const contest_service_1 = require("../service/contest.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guard/auth.guard");
const user_service_1 = require("../service/user.service");
const user_interface_1 = require("../interfaces/user.interface");
const question_interface_1 = require("../interfaces/question.interface");
let ContestResolver = class ContestResolver {
    constructor(userService, contestService, contestModel) {
        this.userService = userService;
        this.contestService = contestService;
        this.contestModel = contestModel;
    }
    async createContest(input, context) {
        const { user } = context.req;
        const contest = new this.contestModel(Object.assign(Object.assign({}, input), { createBy: user._id, id_users: [] }));
        await contest.save();
        return contest;
    }
    async updateContest(input) {
        console.log(input);
        const contest = await this.contestModel.findByIdAndUpdate(input.id, {
            $set: Object.assign({}, input)
        });
        return contest;
    }
    async addQuestionToContest(input) {
        return this.contestService.addQuestion(input);
    }
    async userOfContest(id_contest) {
        const contest = await this.contestModel.findById(id_contest);
        if (!contest)
            return [];
        return this.userService.getUsers(contest.id_users);
    }
    async myContest(context) {
        const { user } = context.req;
        const contests = await this.contestModel.find({
            id_users: { $all: user._id }
        });
        return contests;
    }
    async questionOfContest(id_contest) {
        const questions = await this.contestService.getQuestionOfContest(id_contest);
        console.log(questions);
        return questions;
    }
    async questionOfContestNoAnswer(id_contest) {
        const questions = await this.contestService.getQuestionOfContest(id_contest);
        return questions.map(q => {
            delete q.answer;
            return q;
        });
    }
    async listenContestStart(id) {
        return this.contestService.listenContestStart(id);
    }
    async createBy(parent) {
        console.log(parent);
        return this.userService.getUserById(parent.createBy);
    }
};
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(auth_guard_1.AuthGuardGQL),
    __param(0, graphql_1.Args("input")), __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contest_dto_1.CreateContestInputDTO, Object]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "createContest", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(auth_guard_1.AuthGuardGQL),
    __param(0, graphql_1.Args("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contest_dto_1.UpdateContestInputDTO]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "updateContest", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "addQuestionToContest", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args("id_contest")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "userOfContest", null);
__decorate([
    graphql_1.Query(),
    common_1.UseGuards(auth_guard_1.AuthGuardGQL),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "myContest", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args("id_contest")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "questionOfContest", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args("id_contest")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "questionOfContestNoAnswer", null);
__decorate([
    graphql_1.Subscription(),
    __param(0, graphql_1.Args("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "listenContestStart", null);
__decorate([
    graphql_1.ResolveField('createBy'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContestResolver.prototype, "createBy", null);
ContestResolver = __decorate([
    graphql_1.Resolver("Contest"),
    __param(2, mongoose_1.InjectModel("Contest")),
    __metadata("design:paramtypes", [user_service_1.UserService,
        contest_service_1.ContestService,
        mongoose_2.Model])
], ContestResolver);
exports.ContestResolver = ContestResolver;
//# sourceMappingURL=contest.resolver.js.map