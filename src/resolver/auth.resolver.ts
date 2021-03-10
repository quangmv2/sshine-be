import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Token } from '../interfaces/auth.interface';
import { LoginFromGoogleInput } from "../graphql";
import { AuthService } from '../service/auth.service';
import { log } from 'console';
import { LoginInputDTO } from 'src/dto/auth.dto';

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

    @Mutation("login")
    async login(@Args("input") input: LoginInputDTO): Promise<Token> {
        return this.authService.login(input);
    }

}
