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
exports.GqlModuleConfig = void 0;
const auth_service_1 = require("./service/auth.service");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
let GqlModuleConfig = class GqlModuleConfig {
    constructor(authService) {
        this.authService = authService;
    }
    createGqlOptions() {
        return {
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: path_1.join(process.cwd(), 'src/graphql.ts'),
                outputAs: 'class',
            },
            context: context => {
                const { req, connection } = context;
                if (connection)
                    return {
                        req: connection.context
                    };
                return context;
            },
            installSubscriptionHandlers: true,
            subscriptions: {
                onConnect: async (connectParam, ws) => {
                    const { Authorization } = connectParam;
                    console.log(Authorization);
                    const userContext = await this.authService.verifyToken(Authorization);
                    return userContext ? userContext : false;
                }
            }
        };
    }
};
GqlModuleConfig = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], GqlModuleConfig);
exports.GqlModuleConfig = GqlModuleConfig;
//# sourceMappingURL=grapqlConfigModule.js.map