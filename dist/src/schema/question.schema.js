"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSchema = void 0;
const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
    question: { type: String },
    answers: { type: [String] },
    answer: { type: Number },
    currenTime: { type: Number, default: 30 },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.QuestionSchema = {
    name: "Question",
    schema: questionSchema,
    collection: "questions"
};
//# sourceMappingURL=question.schema.js.map