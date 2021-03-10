import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { AuthService } from 'src/service/auth.service';
export declare class GqlModuleConfig implements GqlOptionsFactory {
    private readonly authService;
    constructor(authService: AuthService);
    createGqlOptions(): GqlModuleOptions;
}
