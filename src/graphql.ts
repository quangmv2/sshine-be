
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum EnumListenContest {
    NEXT = "NEXT",
    ANSWER = "ANSWER",
    WAITTING_QUESTION = "WAITTING_QUESTION",
    QUESTION = "QUESTION",
    END = "END",
    STOP = "STOP"
}

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

export class AddUserToContest {
    id_contest?: string;
    id_user?: string;
}

export class AnswerInput {
    id_contest: string;
    id_question: string;
    answer: number;
}

export class Subscribe {
    id_contest?: string;
    id_user?: string;
}

export class CreateQuestionInput {
    question: string;
    answers?: string[];
    currentTime?: number;
    answer?: number;
}

export class UpdateQuestionInput {
    id?: string;
    question?: string;
    answers?: string[];
    currentTime?: number;
    answer?: number;
}

export class InputCreateUser {
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    image?: string;
    dv: string;
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;

    abstract contests(): Contest[] | Promise<Contest[]>;

    abstract userOfContest(id_contest?: string): User[] | Promise<User[]>;

    abstract questionOfContest(id_contest?: string): Question[] | Promise<Question[]>;

    abstract questionOfContestNoAnswer(id_contest?: string): Question[] | Promise<Question[]>;

    abstract myContest(): Contest[] | Promise<Contest[]>;

    abstract questionNow(id_contest?: string): Question | Promise<Question>;

    abstract queryQuestion(input: string): Question | Promise<Question>;

    abstract queryQuestions(): Question[] | Promise<Question[]>;

    abstract answerQuestion(input: string): number | Promise<number>;

    abstract users(page?: number): UserPaginate | Promise<UserPaginate>;

    abstract doctors(page?: number): UserPaginate | Promise<UserPaginate>;

    abstract user(): User | Promise<User>;

    abstract getUsers(): User[] | Promise<User[]>;
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

    abstract removeContest(input?: string): Contest | Promise<Contest>;

    abstract toggleQuestionToContest(input?: AddQuestionToContest): string | Promise<string>;

    abstract toggleUserToContest(input?: AddUserToContest): string | Promise<string>;

    abstract userOfContest(id_contest?: string): User[] | Promise<User[]>;

    abstract questionOfContest(id_contest?: string): Question[] | Promise<Question[]>;

    abstract answer(input?: AnswerInput): number | Promise<number>;

    abstract contest(id_contest?: string): Contest | Promise<Contest>;

    abstract result(id_contest?: string): UserDataUpdate[] | Promise<UserDataUpdate[]>;

    abstract createOneQuestion(input: CreateQuestionInput): Question | Promise<Question>;

    abstract createManyQuestion(input?: CreateQuestionInput[]): Question[] | Promise<Question[]>;

    abstract user(): User | Promise<User>;

    abstract createUser(input: InputCreateUser): User | Promise<User>;

    abstract changePassword(input?: string, id_user?: string): boolean | Promise<boolean>;

    abstract removeUser(input?: string): User | Promise<User>;
}

export class Contest {
    id?: string;
    name?: string;
    timeStart?: number;
    id_users?: string[];
    id_questions?: string[];
    started?: boolean;
    createBy?: User;
}

export class Answer {
    id_question?: string;
    answer?: number;
}

export class CounterContest {
    question?: Question;
    type?: string;
    time?: number;
}

export class DataStreamContest {
    question?: Question;
    type?: EnumListenContest;
    time?: number;
    answer?: Answer;
    total?: number;
    doing?: number;
}

export class UserDataUpdate {
    user?: User;
    correct?: number;
    reject?: boolean;
}

export abstract class ISubscription {
    abstract listenContestStart(input?: Subscribe): DataStreamContest | Promise<DataStreamContest>;

    abstract listenResult(id_contest?: string): UserDataUpdate[] | Promise<UserDataUpdate[]>;
}

export class Question {
    id?: string;
    question?: string;
    answers?: string[];
    answer?: number;
    currentTime?: number;
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
    idRole?: string;
    image?: string;
    dv?: string;
}

export class UserPaginate {
    data?: User[];
    itemCount?: number;
    limit?: number;
    page?: number;
}
