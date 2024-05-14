import { IsNotEmpty } from 'class-validator';

export class StudentsGetDto {
  @IsNotEmpty({ message: 'Mã sinh viên không được trống' })
  id: string;
}
