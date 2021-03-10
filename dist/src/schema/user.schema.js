"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.userSchema = void 0;
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String },
    confirm: { type: Boolean, default: false },
    image: { type: String },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.userSchema.plugin(mongoosePaginate);
exports.UserSchema = {
    name: 'User',
    schema: exports.userSchema,
    collection: 'users'
};
//# sourceMappingURL=user.schema.js.map