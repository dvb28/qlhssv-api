import { IsNotEmpty } from 'class-validator';

export class UserPageDto {
  @IsNotEmpty({ message: 'Số trang không được trống' })
  page: number;
}
