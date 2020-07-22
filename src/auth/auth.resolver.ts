import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Token } from './auth.interface';
import { LoginFromGoogleInput } from "../graphql";
import { AuthService } from './auth.service';
import { log } from 'console';

@Resolver('Auth')
export class AuthResolver {

    constructor(
        private readonly authService: AuthService
    ){}

    @Mutation('loginFromGoogle')
    async loginFromGoogle(@Args('input') inputLoginGoogle: LoginFromGoogleInput): Promise<Token> {
        const { id_token } = inputLoginGoogle;
        console.log(id_token);
        return this.authService.loginFromGoogle(id_token);
    }

}
