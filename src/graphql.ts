
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class RegisterInput {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
}

export class LoginInput {
    username: string;
    password: string;
}

export class LoginFromGoogleInput {
    id_token: string;
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;
}

export class Token {
    access_token: string;
}

export abstract class IMutation {
    abstract register(input: RegisterInput): User | Promise<User>;

    abstract login(input: LoginInput): Token | Promise<Token>;

    abstract loginFromGoogle(input: LoginFromGoogleInput): Token | Promise<Token>;
}

export class User {
    id?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
}
