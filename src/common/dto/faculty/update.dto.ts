import { IsNotEmpty } from 'class-validator';

export class FacultyUpdateDto {
  @IsNotEmpty({ message: 'Thiếu ID' })
  id: string;

  @IsNotEmpty({ message: 'Mã không được trống' })
  name: string;

  desc: string;

  faculty_name: string;

  @IsNotEmpty({ message: 'Mã không được trống' })
  identifier_id: string;
}
