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
exports.QuestionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const question_dto_1 = require("../dto/question.dto");
const mongoose_2 = require("mongoose");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guard/auth.guard");
const contest_service_1 = require("../service/contest.service");
const contest_interface_1 = require("../interfaces/contest.interface");
let QuestionResolver = class QuestionResolver {
    constructor(contestService, questionModel) {
        this.contestService = contestService;
        this.questionModel = questionModel;
    }
    async createOneQuestion(input, context) {
        const { user } = context.req;
        const question = new this.questionModel(input);
        await question.save();
        return question;
    }
};
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(auth_guard_1.AuthGuardGQL),
    __param(0, graphql_1.Args("input")), __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_dto_1.CreateQuestionInputDTO, Object]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "createOneQuestion", null);
QuestionResolver = __decorate([
    graphql_1.Resolver("Question"),
    __param(1, mongoose_1.InjectModel("Question")),
    __metadata("design:paramtypes", [contest_service_1.ContestService,
        mongoose_2.Model])
], QuestionResolver);
exports.QuestionResolver = QuestionResolver;
//# sourceMappingURL=question.resolver.js.map