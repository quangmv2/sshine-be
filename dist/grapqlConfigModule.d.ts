import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
export declare class GqlModuleConfig implements GqlOptionsFactory {
    private readonly authService;
    constructor(authService: AuthService);
    createGqlOptions(): GqlModuleOptions;
}
