import { Document } from "mongoose";
import { User } from "./user.interface";

export interface Contest extends Document {
    _id: string;
    name: string;
    timeStart: number;
    started: boolean;
    createBy: string;
    id_users: string[]
    id_questions: string[]
    id_users_reject: string[]
    id_questions_reject: string[]
}

export interface ContestQuestion extends Document {
    id_question: string,
    id_contest: string,
    order: number
}

export interface Answer extends Document {
    id_user: string
    id_question: string,
    id_contest: string,
    answer: number
}