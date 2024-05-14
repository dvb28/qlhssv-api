import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GenderEnum } from 'src/common/enums/students/gender.enum';

export class SignUpDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được trống' })
  @MinLength(5, { message: 'Mật khẩu phải nhiều hơn 5 ký tự' })
  password: string;

  @IsNotEmpty({ message: 'Giới tính không được trống' })
  gender: GenderEnum;

  @IsNotEmpty({ message: 'Họ và tên không được trống' })
  fullname: string;

  @IsNotEmpty({ message: 'Xác nhận mật khẩu không được trống' })
  confirm: string;

  @MinLength(10, { message: 'Số điện thoại không hợp lệ' })
  @MaxLength(10, { message: 'Số điện thoại không hợp lệ' })
  phone: string;

  @IsString()
  avatar: string;
}
