import { IsNotEmpty } from 'class-validator';

export class CoursePageDto {
  @IsNotEmpty({ message: 'Trang dữ liệu không được trống' })
  page: number;
}
