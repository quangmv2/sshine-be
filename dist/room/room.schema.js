"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = exports.roomSchema = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
exports.roomSchema = new mongoose.Schema({
    time_start: { type: Number, required: true },
    time_end: { type: Number, required: true },
    content: { type: String, required: true },
    note: { type: String },
    user_customer_id: { type: mongoose_1.Schema.Types.ObjectId },
    user_id: { type: mongoose_1.Schema.Types.ObjectId },
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