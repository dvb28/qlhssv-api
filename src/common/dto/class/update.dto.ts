import { IsNotEmpty } from 'class-validator';

export class ClassUpdateDto {
  @IsNotEmpty({ message: 'Thiếu ID' })
  id: string;

  @IsNotEmpty({ message: 'Mã không được trống' })
  name: string;

  desc: string;

  @IsNotEmpty({ message: 'Mã không được trống' })
  identifier_id: string;

  @IsNotEmpty({ message: 'Mã khoa không được trống' })
  faculty_id: string;

  @IsNotEmpty({ message: 'Số khoá học không được trống' })
  course_id: string;
}
