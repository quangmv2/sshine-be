"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = exports.tokenSchema = void 0;
const mongoose = require("mongoose");
exports.tokenSchema = new mongoose.Schema({
    access_token: { type: String, required: true },
    secret: { type: String, required: true },
    limit: { type: Number, default: 100000000 },
    confirm: { type: Boolean },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.TokenSchema = {
    name: "Token",
    schema: exports.tokenSchema,
    collection: "tokens"
};
//# sourceMappingURL=auth.schema.js.map