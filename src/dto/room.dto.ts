import { BookRoomInput } from "../graphql";

export class BookRoomInputDTO extends BookRoomInput {
    code: string;
    user_customer_id: string;
}