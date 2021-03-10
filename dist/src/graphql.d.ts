export declare class RegisterInput {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
}
export declare class LoginInput {
    username: string;
    password: string;
}
export declare class LoginFromGoogleInput {
    id_token: string;
}
export declare class CreateContestInput {
    name: string;
    timeStart: number;
}
export declare class UpdateContestInput {
    id?: string;
    name?: string;
    timeStart?: number;
    id_users?: string[];
}
export declare class CreateQuestionInput {
    question: string;
    answers?: string[];
    answer?: number;
    id_contest: string;
}
export declare class UpdateQuestionInput {
    id?: string;
    question?: string;
    answers?: string[];
    answer?: number;
    id_contest?: string;
}
export declare abstract class IQuery {
    abstract hello(): string | Promise<string>;
    abstract contests(): Contest[] | Promise<Contest[]>;
    abstract contest(id_contest?: string): Contest | Promise<Contest>;
    abstract userOfContest(id_contest?: string): User[] | Promise<User[]>;
    abstract myContest(): Contest[] | Promise<Contest[]>;
    abstract questionNow(id_contest?: string): Question | Promise<Question>;
    abstract queryQuestion(input: string): Question | Promise<Question>;
    abstract answerQuestion(input: string): number | Promise<number>;
    abstract users(page?: number): UserPaginate | Promise<UserPaginate>;
    abstract doctors(page?: number): UserPaginate | Promise<UserPaginate>;
}
export declare class Token {
    access_token: string;
}
export declare abstract class IMutation {
    abstract register(input: RegisterInput): User | Promise<User>;
    abstract login(input: LoginInput): Token | Promise<Token>;
    abstract loginFromGoogle(input: LoginFromGoogleInput): Token | Promise<Token>;
    abstract createContest(input?: CreateContestInput): Contest | Promise<Contest>;
    abstract updateContest(input?: UpdateContestInput): Contest | Promise<Contest>;
    abstract createOneQuestion(input: CreateQuestionInput): Question | Promise<Question>;
    abstract createManyQuestion(input?: CreateQuestionInput[]): Question[] | Promise<Question[]>;
    abstract user(): User | Promise<User>;
}
export declare class Contest {
    id?: string;
    name?: string;
    timeStart?: number;
    started?: boolean;
    createBy?: User;
}
export declare class CounterContest {
    question?: Question;
    type?: string;
    time?: number;
}
export declare abstract class ISubscription {
    abstract listenContestStart(id?: string): Contest | Promise<Contest>;
    abstract listenQuestionContest(id?: string): CounterContest | Promise<CounterContest>;
}
export declare class Question {
    question?: string;
    answers?: string[];
    answer?: number;
    contest?: Contest;
    createdAt?: number;
    updatedAt?: number;
}
export declare class User {
    id?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    role?: string[];
    image?: string;
}
export declare class UserPaginate {
    data?: User[];
    itemCount?: number;
    limit?: number;
    page?: number;
}
