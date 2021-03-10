import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from "jsonwebtoken";
import * as randomstring from "randomstring";
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { RegisterInputDTO, LoginInputDTO } from 'src/dto/auth.dto';
import { Token } from "../interfaces/auth.interface";
import { UserService } from '../service/user.service';
import { User } from 'src/graphql';


@Injectable()
export class AuthService {

    private readonly CLIENT_ID = process.env.CLIENT_ID || "";
    private client = new OAuth2Client(this.CLIENT_ID);

    constructor(
        @InjectModel('Token') private readonly tokenModel: Model<Token>,
        private readonly userService: UserService
    ){}

    async verifyGoogleToken(idToken: string): Promise<TokenPayload> {
        console.log(idToken);
        
        try {
            const ticket = await this.client.verifyIdToken({
                idToken,
                audience: [
                    this.CLIENT_ID,
                    '48642982972-na98mh55jhdcujsskk6pfn9jkr607jh6.apps.googleusercontent.com'
                ], 
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            return payload;
        } catch (error) {
            return undefined;
        }
    }

    async loginFromGoogle(idToken: string): Promise<Token> {
        const payload = await this.verifyGoogleToken(idToken);
        console.log(payload);
        if (!payload) throw new HttpException({code: 401}, HttpStatus.UNAUTHORIZED);
        let user = await this.userService.getUserByUserNameOrEmail(payload.email)
        if (!user) {
            const inputUser: RegisterInputDTO = new RegisterInputDTO();
            inputUser.email = payload.email;
            inputUser.firstname = payload.given_name;
            inputUser.lastname = payload.family_name;
            inputUser.password = bcrypt.hashSync(randomstring.generate(), 10);
            inputUser.username = uuidv4();
            inputUser.image = payload.picture;
            user = await this.userService.createUser(inputUser);
        } 
        const userToken = {
            userID: user.id
        }
        return this.createToken(userToken);
    }

    async login(input: LoginInputDTO): Promise<Token> {
        const { username, password } = input;
        const user = await this.userService.getUserByUserNameOrEmail(username);
        if (!user) throw new HttpException('Incorrect', HttpStatus.UNAUTHORIZED);
        
        if (!bcrypt.compareSync(password, user.password)) throw new HttpException('Incorrect', HttpStatus.UNAUTHORIZED);
        // console.log(user);
        
        const userToken = {
            userID: user.id
        }
        return this.createToken(userToken);
    }

    async register(input: RegisterInputDTO): Promise<Token> {
        input.username = uuidv4();
        input.password = bcrypt.hashSync(input.password, 10);
        const user = await this.userService.createUser(input);
        const userToken = {
            userID: user.id
        }
        return this.createToken(userToken);
    }

    async createToken(object: any): Promise<Token> {
        const secret = randomstring.generate(Math.floor(Math.random() * 25) + 10);
        var token = new this.tokenModel({
            access_token: jwt.sign(object, secret),
            secret,
            confirm: true
        });
        token.save();
        return token;
    }

    async verifyToken(access_token: string): Promise<User> {
        if (!access_token) return undefined;
        access_token = access_token.replace('Bearer ', '');
        console.log(access_token);
        
        const checkToken = await this.tokenModel.findOne({
            access_token: { $eq: access_token },
            confirm: true
        }).exec();
        console.log(checkToken);
        
        if (!checkToken) return undefined;
        const { secret } = checkToken;
        try {
            const userObj = jwt.verify(access_token, secret);
            const { userID } = userObj;
            console.log(userID, userObj);
            const user = await this.userService.getUserById(userID);
            console.log(user);
            
            return user?user:undefined;
        } catch (error) {
            return undefined;
        }
    }

}
