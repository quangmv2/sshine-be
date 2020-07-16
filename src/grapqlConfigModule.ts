import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

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
                onConnect: (connectParam: any, ws) => {
                    const { Authorization } = connectParam;
                    console.log(connectParam);
                    
                    const userContext = this.authService.verifyToken(Authorization);
                    return userContext?userContext:false;
                }
            }
        };
    }


}