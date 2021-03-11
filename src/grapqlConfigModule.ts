import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { AuthService } from 'src/service/auth.service';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class GqlModuleConfig implements GqlOptionsFactory {

    constructor(private readonly authService: AuthService){}

    createGqlOptions(): GqlModuleOptions {
        return {
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
                outputAs: 'class',
            },
            context: context => {
                const {req, connection} = context;
                if (connection) return {
                    req: connection.context
                }
                return context;
            },
            installSubscriptionHandlers: true,
            subscriptions: {
                onConnect: async(connectParam: any, ws, ctx) => {
                    const { Authorization } = connectParam;
                    return true;
                    // console.log(connectParam, ws, ctx);
                    const userContext = await this.authService.verifyToken(Authorization);
                    // connectParam["req"] = userContext;
                    return userContext?userContext:false;
                }
            }
        };
    }


}