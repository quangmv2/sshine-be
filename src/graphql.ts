
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

export class PostInput {
    id?: string;
    title?: string;
    content?: string;
    image?: string;
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;

    abstract post(id_post?: string): Post | Promise<Post>;

    abstract posts(page?: number, limit?: number): PostPaginate | Promise<PostPaginate>;

    abstract myPosts(offset?: number, limits?: number): Post[] | Promise<Post[]>;
}

export class Token {
    access_token: string;
}

export abstract class IMutation {
    abstract register(input: RegisterInput): User | Promise<User>;

    abstract login(input: LoginInput): Token | Promise<Token>;

    abstract loginFromGoogle(input: LoginFromGoogleInput): Token | Promise<Token>;

    abstract addPost(input: PostInput): Post | Promise<Post>;

    abstract deletePost(id_post?: string): Post | Promise<Post>;

    abstract user(): User | Promise<User>;
}

export abstract class ISubscription {
    abstract listenNewPost(): Post | Promise<Post>;
}

export class Post {
    id?: string;
    title?: string;
    content?: string;
    image?: string;
    comments?: Comment[];
    likes?: Like[];
    user?: User;
    createdAt?: number;
    updatedAt?: number;
}

export class PostPaginate {
    data?: Post[];
    itemCount?: number;
    limit?: number;
    page?: number;
}

export class Comment {
    id?: string;
    user?: User;
    content?: string;
    total?: number;
    created_at?: number;
    updated_at?: number;
}

export class Like {
    id?: string;
    user?: User;
    total?: number;
    created_at?: number;
    updated_at?: number;
}

export class User {
    id?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
}
