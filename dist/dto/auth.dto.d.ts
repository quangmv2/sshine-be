import { LoginInput } from 'src/graphql';
export declare class RegisterInputDTO {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    image: string;
}
export declare class LoginInputDTO extends LoginInput {
    username: string;
    password: string;
}
