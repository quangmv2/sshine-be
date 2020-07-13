import { Document } from "mongoose";
export interface Room extends Document {
    id?: string;
    time_start?: number;
    time_end?: number;
    code?: string;
    note?: string;
    user_customer_id?: string;
    user_id: string;
    created_at?: number;
    updated_at?: number;
}
