import { Document } from "mongoose";

export interface Token extends Document {
    _id: string;
    access_token: string,
    secret: string,
    limit: Number,
    confirm: boolean,
    createdAt: Number,
    updatedAt: Number
}