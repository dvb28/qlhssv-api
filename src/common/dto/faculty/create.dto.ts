import { IsNotEmpty } from 'class-validator';

export class FacultyCreateDto {
  @IsNotEmpty({ message: 'Tên khoa không được trống' })
  name: string;

  desc: string;

  @IsNotEmpty({ message: 'Mã không được trống' })
  identifier_id: string;
}
