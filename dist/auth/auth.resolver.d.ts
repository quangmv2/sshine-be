import { Token } from './auth.interface';
import { LoginFromGoogleInput } from "../graphql";
import { AuthService } from './auth.service';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    loginFromGoogle(inputLoginGoogle: LoginFromGoogleInput): Promise<Token>;
}
