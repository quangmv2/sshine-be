import * as mongoose from 'mongoose';
import {mongoosePagination} from "ts-mongoose-pagination";
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const userSchema = new mongoose.Schema({

    username: { type: String, unique: true, required: true},
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String,  required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String },
    confirm: { type: Boolean, default: false },
    active: {type: Array, default: false},
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