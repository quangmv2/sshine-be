"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = exports.roomSchema = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const messageDetailSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['image', 'quote', 'send', 'sticker'],
        default: 'send'
    },
    content: { type: String, required: true },
    status: {
        type: String,
        enum: ['Send', 'Delivered', 'Seen'],
        default: 'Send'
    },
    from: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.roomSchema = new mongoose.Schema({
    time_start: { type: Number, required: true },
    time_end: { type: Number, required: true },
    code: { type: String, required: true, unique: true },
    note: { type: String },
    user_customer_id: { type: mongoose_1.Schema.Types.ObjectId },
    user_id: { type: mongoose_1.Schema.Types.ObjectId },
    messages: [messageDetailSchema],
    status: { type: mongoose_1.Schema.Types.Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
exports.roomSchema.plugin(mongoosePaginate);
exports.RoomSchema = {
    name: "Room",
    schema: exports.roomSchema,
    collection: "rooms"
};
//# sourceMappingURL=room.schema.js.map