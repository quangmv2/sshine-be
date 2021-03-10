import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const questionSchema = new mongoose.Schema({
    // id: {type: String},
    // _id: { type: String },
    // _id: { type: Schema.Types.ObjectId },
    question: { type: String },
    answers: { type:  [String]},
    answer: { type: Number },
    id_contest: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number }
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});


export const QuestionSchema = {
    name: "Question",
    schema: questionSchema,
    collection: "questions"
}


