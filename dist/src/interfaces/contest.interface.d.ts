import { Document } from "mongoose";
export interface Contest extends Document {
    _id: string;
    name: string;
    timeStart: number;
    started: boolean;
    createBy: string;
    id_users: string[];
}
