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
exports.LoginInputDTO = exports.RegisterInputDTO = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("../graphql");
class RegisterInputDTO {
}
__decorate([
    class_validator_1.IsNotEmpty({
        message: "Tài khoản không được rỗng."
    }),
    __metadata("design:type", String)
], RegisterInputDTO.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty({
        message: "Mật khẩu không được rỗng."
    }),
    __metadata("design:type", String)
], RegisterInputDTO.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty({
        message: "Tên không được rỗng."
    }),
    __metadata("design:type", String)
], RegisterInputDTO.prototype, "firstname", void 0);
__decorate([
    class_validator_1.IsNotEmpty({
        message: "Họ không được rỗng."
    }),
    __metadata("design:type", String)
], RegisterInputDTO.prototype, "lastname", void 0);
__decorate([
    class_validator_1.IsNotEmpty({
        message: "Email không được rỗng."
    }),
    class_validator_1.IsEmail({}, {
        message: "Email không đúng."
    }),
    __metadata("design:type", String)
], RegisterInputDTO.prototype, "email", void 0);
exports.RegisterInputDTO = RegisterInputDTO;
class LoginInputDTO extends graphql_1.LoginInput {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginInputDTO.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginInputDTO.prototype, "password", void 0);
exports.LoginInputDTO = LoginInputDTO;
//# sourceMappingURL=auth.dto.js.map