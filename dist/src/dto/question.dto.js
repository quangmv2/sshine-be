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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuestionInputDTO = exports.CreateQuestionInputDTO = void 0;
const graphql_1 = require("../graphql");
const class_validator_1 = require("class-validator");
class CreateQuestionInputDTO extends graphql_1.CreateQuestionInput {
}
__decorate([
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], CreateQuestionInputDTO.prototype, "id_contest", void 0);
exports.CreateQuestionInputDTO = CreateQuestionInputDTO;
class UpdateQuestionInputDTO extends graphql_1.UpdateQuestionInput {
}
exports.UpdateQuestionInputDTO = UpdateQuestionInputDTO;
//# sourceMappingURL=question.dto.js.map