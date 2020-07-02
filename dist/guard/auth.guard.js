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
exports.AuthGuard = exports.AuthGuardGQL = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("../auth/auth.service");
let AuthGuardGQL = class AuthGuardGQL {
    constructor(authService) {
        this.authService = authService;
    }
    async canActivate(context) {
        const ctx = await graphql_1.GqlExecutionContext.create(context).getContext();
        let token = ctx.req.headers.authorization;
        const user = await this.authService.verifyToken(token);
        if (!user)
            return false;
        ctx.req.user = user;
        ctx.req.token = token;
        return true;
    }
};
AuthGuardGQL = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthGuardGQL);
exports.AuthGuardGQL = AuthGuardGQL;
let AuthGuard = class AuthGuard {
    constructor(authService) {
        this.authService = authService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = req && req.headers.authorization;
        const user = await this.authService.verifyToken(token);
        if (!user)
            return false;
        req.user = user;
        return true;
    }
};
AuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map