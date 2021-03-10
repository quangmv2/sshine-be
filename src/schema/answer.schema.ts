import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const answerSchema = new mongoose.Schema({
    // id: {type: String},
    // _id: { type: String },
    // _id: { type: Schema.Types.ObjectId },
    id_question: { type: Schema.Types.ObjectId, required: true },
    id_user: { type: Schema.Types.ObjectId, required: true },
    answer: { type: Number },
    createdAt: { type: Number },
    updatedAt: { type: Number }
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});


export const AnswerSchema = {
    name: "Answer",
    schema: answerSchema,
    collection: "answers"
}


