import { IsNotEmpty } from 'class-validator';

export class FacultyPageDto {
  @IsNotEmpty({ message: 'Trang dữ liệu không được trống' })
  page: number;
}
