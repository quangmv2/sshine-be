"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestModule = void 0;
const common_1 = require("@nestjs/common");
const contest_service_1 = require("../service/contest.service");
const contest_resolver_1 = require("../resolver/contest.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const contest_schema_1 = require("../schema/contest.schema");
const user_module_1 = require("./user.module");
const schedule_1 = require("@nestjs/schedule");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const question_module_1 = require("./question.module");
const PubSubMessage = {
    provide: 'PUB_SUB_MESSAGE',
    useValue: new graphql_subscriptions_1.PubSub()
};
let ContestModule = class ContestModule {
};
ContestModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([contest_schema_1.ContestShema]),
            schedule_1.ScheduleModule.forRoot(),
            user_module_1.UserModule,
            common_1.forwardRef(() => question_module_1.QuestionModule)
        ],
        providers: [contest_service_1.ContestService, contest_resolver_1.ContestResolver, PubSubMessage],
        exports: [contest_service_1.ContestService]
    })
], ContestModule);
exports.ContestModule = ContestModule;
//# sourceMappingURL=contest.module.js.map