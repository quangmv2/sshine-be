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
    time_start: number;
    time_end: number;
    content: string;
    note?: string;
    user_customer_id: string;
    user_id: string;
}
export declare abstract class IQuery {
    abstract hello(): string | Promise<string>;
    abstract post(id_post?: string): Post | Promise<Post>;
    abstract posts(page?: number, limit?: number): PostPaginate | Promise<PostPaginate>;
    abstract myPosts(offset?: number, limits?: number): Post[] | Promise<Post[]>;
    abstract rooms(user_id?: string): Room[] | Promise<Room[]>;
    abstract roomDetail(room_id?: string): Room | Promise<Room>;
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
    abstract user(): User | Promise<User>;
}
export declare abstract class ISubscription {
    abstract listenNewPost(): Post | Promise<Post>;
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
    content?: string;
    note?: string;
    user_customer_id?: string;
    user_id?: string;
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
}
export declare class UserPaginate {
    data?: User[];
    itemCount?: number;
    limit?: number;
    page?: number;
}
