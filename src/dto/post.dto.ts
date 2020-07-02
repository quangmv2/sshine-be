import { IsNotEmpty, IsEmail } from 'class-validator';
import { LoginInput } from 'src/graphql';

export class PostInputDTO {

    title?: string;
    content?: string;
    
}