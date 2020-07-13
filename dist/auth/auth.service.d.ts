import { TokenPayload } from "google-auth-library";
import { Model } from 'mongoose';
import { RegisterInputDTO, LoginInputDTO } from 'src/dto/auth.dto';
import { Token } from "./auth.interface";
import { UserService } from 'src/user/user.service';
import { User } from 'src/graphql';
export declare class AuthService {
    private readonly tokenModel;
    private readonly userService;
    private readonly CLIENT_ID;
    private client;
    constructor(tokenModel: Model<Token>, userService: UserService);
    verifyGoogleToken(idToken: string): Promise<TokenPayload>;
    loginFromGoogle(idToken: string): Promise<Token>;
    login(input: LoginInputDTO): Promise<Token>;
    register(input: RegisterInputDTO): Promise<Token>;
    createToken(object: any): Promise<Token>;
    verifyToken(access_token: string): Promise<User>;
}
