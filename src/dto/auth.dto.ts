import { IsNotEmpty, IsEmail } from 'class-validator';
import { LoginInput } from 'src/graphql';

export class RegisterInputDTO {

    @IsNotEmpty({
        message: "Tài khoản không được rỗng."
    })
    username: string;

    @IsNotEmpty({
        message: "Mật khẩu không được rỗng."
    })
    password: string;

    @IsNotEmpty({
        message: "Tên không được rỗng."
    })
    firstname: string;

    @IsNotEmpty({
        message: "Họ không được rỗng."
    })
    lastname: string;

    @IsNotEmpty({
        message: "Email không được rỗng."
    })
    @IsEmail({},
    {
        message: "Email không đúng."
    })
    email: string;

    // @Matches(/(0)[0-9]{9}/, {
    //     message: "Định dạng số  điện thoại chưa đúng."
    // })
    phoneNumber: string;

    image: string;
}
export class LoginInputDTO extends LoginInput{
    
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}