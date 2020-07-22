import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
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
                onConnect: async(connectParam: any, ws) => {
                    const { Authorization } = connectParam;
                    const userContext = await this.authService.verifyToken(Authorization);
                    return userContext?userContext:false;
                }
            }
        };
    }


}