"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerSchema = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const answerSchema = new mongoose.Schema({
    id_question: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    id_user: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    answer: { type: Number },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.AnswerSchema = {
    name: "Answer",
    schema: answerSchema,
    collection: "answers"
};
//# sourceMappingURL=answer.schema.js.map