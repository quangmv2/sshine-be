
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

export class CreateContestInput {
    name: string;
    timeStart: number;
}

export class UpdateContestInput {
    id?: string;
    name?: string;
    timeStart?: number;
    id_users?: string[];
}

export class AddQuestionToContest {
    id_contest?: string;
    id_question?: string;
}

export class CreateQuestionInput {
    question: string;
    answers?: string[];
    currenTime?: number;
    answer?: number;
}

export class UpdateQuestionInput {
    id?: string;
    question?: string;
    answers?: string[];
    currenTime?: number;
    answer?: number;
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;

    abstract contests(): Contest[] | Promise<Contest[]>;

    abstract contest(id_contest?: string): Contest | Promise<Contest>;

    abstract userOfContest(id_contest?: string): User[] | Promise<User[]>;

    abstract questionOfContest(id_contest?: string): Question[] | Promise<Question[]>;

    abstract questionOfContestNoAnswer(id_contest?: string): Question[] | Promise<Question[]>;

    abstract myContest(): Contest[] | Promise<Contest[]>;

    abstract questionNow(id_contest?: string): Question | Promise<Question>;

    abstract queryQuestion(input: string): Question | Promise<Question>;

    abstract answerQuestion(input: string): number | Promise<number>;

    abstract users(page?: number): UserPaginate | Promise<UserPaginate>;

    abstract doctors(page?: number): UserPaginate | Promise<UserPaginate>;
}

export class Token {
    access_token: string;
}

export abstract class IMutation {
    abstract register(input: RegisterInput): User | Promise<User>;

    abstract login(input: LoginInput): Token | Promise<Token>;

    abstract loginFromGoogle(input: LoginFromGoogleInput): Token | Promise<Token>;

    abstract createContest(input?: CreateContestInput): Contest | Promise<Contest>;

    abstract updateContest(input?: UpdateContestInput): Contest | Promise<Contest>;

    abstract addQuestionToContest(input?: AddQuestionToContest): Contest | Promise<Contest>;

    abstract createOneQuestion(input: CreateQuestionInput): Question | Promise<Question>;

    abstract createManyQuestion(input?: CreateQuestionInput[]): Question[] | Promise<Question[]>;

    abstract user(): User | Promise<User>;
}

export class Contest {
    id?: string;
    name?: string;
    timeStart?: number;
    started?: boolean;
    createBy?: User;
}

export class CounterContest {
    question?: Question;
    type?: string;
    time?: number;
}

export abstract class ISubscription {
    abstract listenContestStart(id?: string): Contest | Promise<Contest>;

    abstract listenQuestionContest(id?: string): CounterContest | Promise<CounterContest>;
}

export class Question {
    id?: string;
    question?: string;
    answers?: string[];
    answer?: number;
    currenTime?: number;
    createdAt?: number;
    updatedAt?: number;
}

export class User {
    id?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    role?: string[];
    image?: string;
}

export class UserPaginate {
    data?: User[];
    itemCount?: number;
    limit?: number;
    page?: number;
}
