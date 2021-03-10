import { Document } from "mongoose";
export interface Question extends Document {
    _id: string;
    question: string;
    answers: String[];
    answer: number;
    id_contest: string;
    createdAt: number;
    updatedAt: number;
}
