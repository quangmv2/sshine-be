import { Document } from "mongoose";
export interface Question extends Document {
    _id: string;
    question: string;
    answers: String[];
    answer: number;
    currenTime: number;
    createdAt: number;
    updatedAt: number;
}
