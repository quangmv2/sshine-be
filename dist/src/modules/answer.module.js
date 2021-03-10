"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerModule = void 0;
const common_1 = require("@nestjs/common");
const answer_service_1 = require("../service/answer.service");
const answer_resolver_1 = require("../resolver/answer.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const answer_schema_1 = require("../schema/answer.schema");
let AnswerModule = class AnswerModule {
};
AnswerModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([answer_schema_1.AnswerSchema]),
        ],
        providers: [answer_service_1.AnswerService, answer_resolver_1.AnswerResolver]
    })
], AnswerModule);
exports.AnswerModule = AnswerModule;
//# sourceMappingURL=answer.module.js.map