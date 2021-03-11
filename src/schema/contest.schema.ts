import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const contestShema = new mongoose.Schema({

    // _id: { type: Schema.Types.ObjectId },
    name: { type: String},
    timeStart: { type: Number },
    started: { type: Boolean, default: false },
    createBy: { type: Schema.Types.ObjectId, required: true },
    id_users: { type: [Schema.Types.ObjectId], required: true },
    id_users_reject: { type: [Schema.Types.ObjectId] },
    id_questions: { type: [Schema.Types.ObjectId], required: true },
    id_questions_reject: { type: [Schema.Types.ObjectId], required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number }
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});


const contestQuestionShema = new mongoose.Schema({

    // _id: { type: Schema.Types.ObjectId },
    order: { type: Number },
    id_contest: { type: Schema.Types.ObjectId, required: true },
    id_question: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number }
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});

export const ContestQuestionShema = {
    name: "ContestQuestion",
    schema: contestQuestionShema,
    collection: "contest_questions"
}

export const ContestShema = {
    name: "Contest",
    schema: contestShema,
    collection: "contests"
}


