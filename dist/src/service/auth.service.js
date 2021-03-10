"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const google_auth_library_1 = require("google-auth-library");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const bcrypt = require("bcryptjs");
const uuid_1 = require("uuid");
const auth_dto_1 = require("../dto/auth.dto");
const user_service_1 = require("../service/user.service");
const graphql_1 = require("../graphql");
let AuthService = class AuthService {
    constructor(tokenModel, userService) {
        this.tokenModel = tokenModel;
        this.userService = userService;
        this.CLIENT_ID = process.env.CLIENT_ID || "";
        this.client = new google_auth_library_1.OAuth2Client(this.CLIENT_ID);
    }
    async verifyGoogleToken(idToken) {
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
        }
        catch (error) {
            return undefined;
        }
    }
    async loginFromGoogle(idToken) {
        const payload = await this.verifyGoogleToken(idToken);
        console.log(payload);
        if (!payload)
            throw new common_1.HttpException({ code: 401 }, common_1.HttpStatus.UNAUTHORIZED);
        let user = await this.userService.getUserByUserNameOrEmail(payload.email);
        if (!user) {
            const inputUser = new auth_dto_1.RegisterInputDTO();
            inputUser.email = payload.email;
            inputUser.firstname = payload.given_name;
            inputUser.lastname = payload.family_name;
            inputUser.password = bcrypt.hashSync(randomstring.generate(), 10);
            inputUser.username = uuid_1.v4();
            inputUser.image = payload.picture;
            user = await this.userService.createUser(inputUser);
        }
        const userToken = {
            userID: user.id
        };
        return this.createToken(userToken);
    }
    async login(input) {
        const { username, password } = input;
        const user = await this.userService.getUserByUserNameOrEmail(username);
        if (!user)
            throw new common_1.HttpException('Incorrect', common_1.HttpStatus.UNAUTHORIZED);
        if (!bcrypt.compareSync(password, user.password))
            throw new common_1.HttpException('Incorrect', common_1.HttpStatus.UNAUTHORIZED);
        const userToken = {
            userID: user.id
        };
        return this.createToken(userToken);
    }
    async register(input) {
        input.username = uuid_1.v4();
        input.password = bcrypt.hashSync(input.password, 10);
        const user = await this.userService.createUser(input);
        const userToken = {
            userID: user.id
        };
        return this.createToken(userToken);
    }
    async createToken(object) {
        const secret = randomstring.generate(Math.floor(Math.random() * 25) + 10);
        var token = new this.tokenModel({
            access_token: jwt.sign(object, secret),
            secret,
            confirm: true
        });
        token.save();
        return token;
    }
    async verifyToken(access_token) {
        if (!access_token)
            return undefined;
        access_token = access_token.replace('Bearer ', '');
        console.log(access_token);
        const checkToken = await this.tokenModel.findOne({
            access_token: { $eq: access_token },
            confirm: true
        }).exec();
        console.log(checkToken);
        if (!checkToken)
            return undefined;
        const { secret } = checkToken;
        try {
            const userObj = jwt.verify(access_token, secret);
            const { userID } = userObj;
            console.log(userID, userObj);
            const user = await this.userService.getUserById(userID);
            console.log(user);
            return user ? user : undefined;
        }
        catch (error) {
            return undefined;
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Token')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map