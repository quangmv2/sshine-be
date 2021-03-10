import { Token } from '../interfaces/auth.interface';
import { LoginFromGoogleInput } from "../graphql";
import { AuthService } from '../service/auth.service';
import { LoginInputDTO } from 'src/dto/auth.dto';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    loginFromGoogle(inputLoginGoogle: LoginFromGoogleInput): Promise<Token>;
    login(input: LoginInputDTO): Promise<Token>;
}
