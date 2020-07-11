import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';


export const roomSchema = new mongoose.Schema({
    
    time_start: { type: Number, required:true },
    time_end: { type: Number, required:true },
    content: { type: String,  required: true },
    note: { type: String },
    user_customer_id: { type: Schema.Types.ObjectId },
    user_id: { type: Schema.Types.ObjectId },
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
