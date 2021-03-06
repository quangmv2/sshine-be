import * as mongoose from 'mongoose';

export const tokenSchema = new mongoose.Schema({
    
    access_token: { type: String, required:true },
    secret: { type: String,  required: true },
    limit: { type: Number, default: 100000000 },
    confirm: { type: Boolean },
    createdAt: { type: Number },
    updatedAt: { type: Number }
    
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});

export const TokenSchema = {
    name: "Token",
    schema: tokenSchema,
    collection: "tokens"
}