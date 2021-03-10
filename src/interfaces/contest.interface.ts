import { Document } from "mongoose";
import { User } from "./user.interface";

export interface Contest extends Document {
    _id: string;
    name: string;
    timeStart: number;
    started: boolean;
    createBy: string;
    id_users: string[]
}