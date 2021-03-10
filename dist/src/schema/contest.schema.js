"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestShema = exports.ContestQuestionShema = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const contestShema = new mongoose.Schema({
    name: { type: String },
    timeStart: { type: Number },
    started: { type: Boolean, default: false },
    createBy: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    id_users: { type: [mongoose_1.Schema.Types.ObjectId], required: true },
    id_questions: { type: [mongoose_1.Schema.Types.ObjectId], required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
const contestQuestionShema = new mongoose.Schema({
    order: { type: Number },
    id_contest: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    id_question: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.ContestQuestionShema = {
    name: "ContestQuestion",
    schema: contestQuestionShema,
    collection: "contest_questions"
};
exports.ContestShema = {
    name: "Contest",
    schema: contestShema,
    collection: "contests"
};
//# sourceMappingURL=contest.schema.js.map