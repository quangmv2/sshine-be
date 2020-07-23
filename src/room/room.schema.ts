import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const messageDetailSchema = new mongoose.Schema({
    // id: {type: String},
    type: { 
        type: String,
        enum: ['image', 'quote', 'send', 'sticker'],
        // required: true,
        default: 'send'
     },
    content: { type: String, required: true },
    status: {
        type: String,
        enum: ['Send', 'Delivered', 'Seen'],
        // required: true,
        default: 'Send'
    },
    from: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number }
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});

export const roomSchema = new mongoose.Schema({
    
    time_start: { type: Number, required:true },
    time_end: { type: Number, required:true },
    code: { type: String,  required: true, unique: true },
    note: { type: String },
    user_customer_id: { type: Schema.Types.ObjectId },
    user_id: { type: Schema.Types.ObjectId },
    messages: [messageDetailSchema],
    status: { type: Schema.Types.Boolean, default: false},
    createdAt: { type: Number },
    updatedAt: { type: Number }
    
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});

roomSchema.plugin(mongoosePaginate);

export const RoomSchema = {
    name: "Room",
    schema: roomSchema,
    collection: "rooms"
}


