import { IsNotEmpty } from 'class-validator';

export class CourseSearchDto {
  @IsNotEmpty({ message: 'Trang dữ liệu không được trống' })
  page: number;

  @IsNotEmpty({ message: 'Nội dung tìm kiếm không được trống' })
  search: string;

  @IsNotEmpty({ message: 'Trường dữ liệu muốn tìm kiếm không được trống' })
  field: string;
}
