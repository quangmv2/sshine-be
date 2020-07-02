import { Document } from "mongoose";

export interface Post extends Document{
    id?: string;
    title?: string;
    content?: string;
    image?: string;
    comments?: string[];
    likes?: string[];
    user: string;
    created_at?: number;
    updated_at?: number;
}

export interface Comment extends Document{
    id?: string;
    user?: string;
    content?: string;
    created_at?: number;
    updated_at?: number;
}

export interface Like extends Document{
    id?: string;
    user?: string;
    created_at?: number;
    updated_at?: number;
}