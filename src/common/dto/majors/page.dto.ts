import { IsNotEmpty } from 'class-validator';

export class MajorsPageDto {
  @IsNotEmpty({ message: 'Trang dữ liệu không được trống' })
  page: number;
}
