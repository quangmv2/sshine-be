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
let ContestService = class ContestService {
    constructor(pubSub, contestModel) {
        this.pubSub = pubSub;
        this.contestModel = contestModel;
    }
    async findContest(id) {
        return this.contestModel.findById(id);
    }
    async listenContestStart(id_contest) {
        return this.pubSub.asyncIterator(`CONTEST_START: ${id_contest}`);
    }
    async getQuestionOfContest(id_contest) {
        return [];
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
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSub,
        mongoose_2.Model])
], ContestService);
exports.ContestService = ContestService;
class Counter {
    constructor(contestService, contest) {
        this.contestService = contestService;
    }
    async start() {
    }
}
//# sourceMappingURL=contest.service.js.map