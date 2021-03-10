import * as mongoose from 'mongoose';
import {mongoosePagination} from "ts-mongoose-pagination";
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Schema } from 'mongoose';

export const userSchema = new mongoose.Schema({

    _id: { type: Schema.Types.ObjectId },
    username: { type: String, unique: true, required: true},
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String,  required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String },
    confirm: { type: Boolean, default: false },
    image: { type: String },
    createdAt: { type: Number },
    updatedAt: { type: Number }
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});

userSchema.plugin(mongoosePaginate);

export const UserSchema = {
    name: 'User',
    schema: userSchema,
    collection: 'users'
}