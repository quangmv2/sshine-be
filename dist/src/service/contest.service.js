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
exports.ContestService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const contest_interface_1 = require("../interfaces/contest.interface");
const mongoose_2 = require("mongoose");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const schedule_1 = require("@nestjs/schedule");
const question_interface_1 = require("../interfaces/question.interface");
const apollo_server_express_1 = require("apollo-server-express");
let ContestService = class ContestService {
    constructor(pubSub, contestModel, questionModel, contestQuestionModel) {
        this.pubSub = pubSub;
        this.contestModel = contestModel;
        this.questionModel = questionModel;
        this.contestQuestionModel = contestQuestionModel;
    }
    async findContest(id) {
        return this.contestModel.findById(id);
    }
    async addQuestion(input) {
        const { id_contest, id_question } = input;
        const contest = await this.contestModel.findOne({
            $and: [
                {
                    _id: { $eq: id_contest }
                },
                {
                    id_questions: {
                        $nin: [id_question]
                    }
                }
            ]
        });
        if (!contest)
            throw new apollo_server_express_1.ApolloError("Da ton tai", "GRAPHQL_VALIDATION_FAILED");
        contest.id_questions.push(id_question);
        contest.save();
        return null;
    }
    async listenContestStart(id_contest) {
        return this.pubSub.asyncIterator(`CONTEST_START: ${id_contest}`);
    }
    async getQuestionOfContest(id_contest) {
        console.log(id_contest);
        const contest = await this.contestModel.aggregate().match({
            _id: mongoose_2.Types.ObjectId(id_contest)
        })
            .lookup({
            from: "questions",
            localField: "id_questions",
            foreignField: "_id",
            as: "questions"
        });
        return contest[0].questions;
    }
    async checkContestStart() {
        const now = Date.now();
        const contests = await this.contestModel.find({
            $and: [
                { timeStart: { $lte: now } },
                { started: { $eq: false } }
            ]
        });
        const ids = contests.map(c => c._id);
        this.contestModel.updateMany({ _id: { $in: ids } }, {
            $set: { started: true }
        }).exec();
        console.log("cron", now, contests);
        contests.forEach(c => {
            const publish = {
                listenContestStart: {
                    id: c._id,
                    name: c.name,
                    timeStart: c.timeStart,
                    createBy: c.createBy,
                    started: c.started
                }
            };
            this.pubSub.publish(`CONTEST_START: ${c._id}`, publish);
            const counter = new Counter(this, c);
            counter.start();
        });
    }
};
__decorate([
    schedule_1.Cron("* * * * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContestService.prototype, "checkContestStart", null);
ContestService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PUB_SUB_MESSAGE')),
    __param(1, mongoose_1.InjectModel("Contest")),
    __param(2, mongoose_1.InjectModel("Question")),
    __param(3, mongoose_1.InjectModel("ContestQuestion")),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSub,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ContestService);
exports.ContestService = ContestService;
class Counter {
    constructor(contestService, contest) {
        this.contestService = contestService;
        this.contest = contest;
    }
    async start() {
        console.log("start");
        const questions = await this.contestService.getQuestionOfContest(this.contest._id);
        for (let index = 0; index < questions.length; index++) {
            console.log(index, questions[index]);
            await this.sleep(10 * 1000);
        }
    }
    async sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}
//# sourceMappingURL=contest.service.js.map