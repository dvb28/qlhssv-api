import { IsNotEmpty } from 'class-validator';

export class StudentsPageDto {
  @IsNotEmpty({ message: 'Trang dữ liệu không được trống' })
  page: number;
}
