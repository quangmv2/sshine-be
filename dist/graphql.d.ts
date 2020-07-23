export declare enum TypeMessage {
    quote = "quote",
    send = "send"
}
export declare enum StatusMessage {
    Send = "Send",
    Delivered = "Delivered",
    Seen = "Seen"
}
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
export declare class PostInput {
    id?: string;
    title?: string;
    content?: string;
    image?: string;
}
export declare class BookRoomInput {
    time_start: string;
    time_end: number;
    note?: string;
    user_id: string;
}
export declare class NewMessage {
    content: string;
    to?: string;
}
export declare abstract class IQuery {
    abstract hello(): string | Promise<string>;
    abstract post(id_post?: string): Post | Promise<Post>;
    abstract posts(page?: number, limit?: number): PostPaginate | Promise<PostPaginate>;
    abstract myPosts(offset?: number, limits?: number): Post[] | Promise<Post[]>;
    abstract rooms(user_id?: string): Room[] | Promise<Room[]>;
    abstract myRooms(): Room[] | Promise<Room[]>;
    abstract roomDetail(room_id?: string): Room | Promise<Room>;
    abstract roomBook(): Room[] | Promise<Room[]>;
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
    abstract addPost(input: PostInput): Post | Promise<Post>;
    abstract deletePost(id_post?: string): Post | Promise<Post>;
    abstract like(id_post?: string): Post | Promise<Post>;
    abstract bookRoom(input: BookRoomInput): Room | Promise<Room>;
    abstract sendMessage(input: NewMessage): MessageDetail | Promise<MessageDetail>;
    abstract seenMessage(room_id?: string): string | Promise<string>;
    abstract messageOfRoom(room_id?: string, page?: number): MessageDetail[] | Promise<MessageDetail[]>;
    abstract confirmRoom(room_id?: string): Room | Promise<Room>;
    abstract deleteRoom(room_id?: string): string | Promise<string>;
    abstract user(): User | Promise<User>;
}
export declare abstract class ISubscription {
    abstract listenNewPost(): Post | Promise<Post>;
    abstract listenNewMessage(): MessageDetail | Promise<MessageDetail>;
    abstract listenNewMessageRoom(room_id: string): MessageDetail | Promise<MessageDetail>;
    abstract listenRoom(): string | Promise<string>;
}
export declare class Post {
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
export declare class PostPaginate {
    data?: Post[];
    itemCount?: number;
    limit?: number;
    page?: number;
}
export declare class Comment {
    id?: string;
    user?: User;
    content?: string;
    total?: number;
    created_at?: number;
    updated_at?: number;
}
export declare class Room {
    id?: string;
    time_start?: number;
    time_end?: number;
    code?: string;
    note?: string;
    messages?: MessageDetail[];
    status?: boolean;
    user_customer_id?: User;
    user_id?: User;
    createdAt?: number;
    updatedAt?: number;
}
export declare class MessageDetail {
    id?: string;
    type?: TypeMessage;
    content?: string;
    status?: StatusMessage;
    from?: User;
    to?: Room;
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
