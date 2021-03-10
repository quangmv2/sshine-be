import { Document } from "mongoose";
import { User } from "./user.interface";

export interface Question extends Document {
    _id: string;
    // name: string;
    // timeStart: number;
    // createBy: string;
    // id_users: string[]
    question: string,
    answers: String[],
    answer: number
    currenTime: number
    // id_contest: string,
    createdAt: number,
    updatedAt: number

}