import { Document } from "mongoose";

export interface User extends Document {
    _id: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    confirm: string,
    active: any[],
    createdAt: number,
    updateAt: number
}