import { Document } from "mongoose";
export interface Room extends Document {
    id?: string;
    time_start?: number;
    time_end?: number;
    code?: string;
    note?: string;
    messages: Message[];
    user_customer_id?: string;
    user_id: string;
    status: boolean;
    created_at?: number;
    updated_at?: number;
}
export interface Message {
    id?: string;
    type?: TypeMessage;
    content: string;
    status?: StatusMessage;
    from: string;
    createdAt?: number;
    updatedAt?: number;
}
export declare enum TypeMessage {
    image = "image",
    quote = "quote",
    send = "send",
    sticker = "sticker"
}
export declare enum StatusMessage {
    Send = "Send",
    Delivered = "Delivered",
    Seen = "Seen"
}
