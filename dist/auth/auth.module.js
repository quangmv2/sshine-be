"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_resolver_1 = require("./auth.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("./auth.schema");
const user_module_1 = require("../user/user.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([auth_schema_1.TokenSchema]),
            user_module_1.UserModule
        ],
        providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map