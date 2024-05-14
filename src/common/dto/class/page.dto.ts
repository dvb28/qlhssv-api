import { IsNotEmpty } from 'class-validator';

export class ClassPageDto {
  @IsNotEmpty({ message: 'Trang dữ liệu không được trống' })
  page: number;
}
