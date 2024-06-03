import { IsNotEmpty } from 'class-validator';
import { GenderEnum } from 'src/common/enums/students/gender.enum';

export class UsersUpdateDto {
  @IsNotEmpty({ message: 'ID không được trống' })
  id: string;

  @IsNotEmpty({ message: 'Email không được trống' })
  email: string;

  @IsNotEmpty({ message: 'Họ và tên không được trống' })
  fullname: string;

  @IsNotEmpty({ message: 'Giới tính không được trống' })
  gender: GenderEnum;

  @IsNotEmpty({ message: 'Mật khẩu không được trống' })
  password: string;

  @IsNotEmpty({ message: 'Mật khẩu xác thực không được trống' })
  confirm: string;
}
