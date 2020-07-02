"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.userSchema = void 0;
const mongoose = require("mongoose");
exports.userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String },
    confirm: { type: Boolean, default: false },
    active: { type: Array, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.UserSchema = {
    name: 'User',
    schema: exports.userSchema,
    collection: 'users'
};
//# sourceMappingURL=user.schema.js.map