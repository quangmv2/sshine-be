
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum TypeMessage {
    quote = "quote",
    send = "send"
}

export enum StatusMessage {
    Send = "Send",
    Delivered = "Delivered",
    Seen = "Seen"
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

export class PostInput {
    id?: string;
    title?: string;
    content?: string;
    image?: string;
}

export class BookRoomInput {
    time_start: number;
    time_end: number;
    note?: string;
    user_id: string;
}

export class NewMessage {
    content: string;
    to?: string;
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;

    abstract post(id_post?: string): Post | Promise<Post>;

    abstract posts(page?: number, limit?: number): PostPaginate | Promise<PostPaginate>;

    abstract myPosts(offset?: number, limits?: number): Post[] | Promise<Post[]>;

    abstract rooms(user_id?: string): Room[] | Promise<Room[]>;

    abstract myRooms(): Room[] | Promise<Room[]>;

    abstract roomDetail(room_id?: string): Room | Promise<Room>;

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

    abstract addPost(input: PostInput): Post | Promise<Post>;

    abstract deletePost(id_post?: string): Post | Promise<Post>;

    abstract like(id_post?: string): Post | Promise<Post>;

    abstract bookRoom(input: BookRoomInput): Room | Promise<Room>;

    abstract sendMessage(input: NewMessage): MessageDetail | Promise<MessageDetail>;

    abstract seenMessage(room_id?: string): string | Promise<string>;

    abstract messageOfRoom(room_id?: string, page?: number): MessageDetail[] | Promise<MessageDetail[]>;

    abstract user(): User | Promise<User>;
}

export abstract class ISubscription {
    abstract listenNewPost(): Post | Promise<Post>;

    abstract listenNewMessage(): MessageDetail | Promise<MessageDetail>;

    abstract listenNewMessageRoom(room_id: string): MessageDetail | Promise<MessageDetail>;
}

export class Post {
    id?: string;
    title?: string;
    content?: string;
    image?: string;
    comments?: Comment[];
    likes?: User[];
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

export class Room {
    id?: string;
    time_start?: number;
    time_end?: number;
    code?: string;
    note?: string;
    messages?: MessageDetail[];
    user_customer_id?: User;
    user_id?: User;
    createdAt?: number;
    updatedAt?: number;
}

export class MessageDetail {
    id?: string;
    type?: TypeMessage;
    content?: string;
    status?: StatusMessage;
    from?: User;
    to?: Room;
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
