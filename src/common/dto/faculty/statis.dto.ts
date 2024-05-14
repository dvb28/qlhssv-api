import { IsNotEmpty } from 'class-validator';
import { FacultyCreateDto } from './create.dto';

export class FacultyStatisReqDto {
  @IsNotEmpty({ message: 'Mã khoa không được trống' })
  id: string;
}

export class FacultyStatisResDto extends FacultyCreateDto {
  id: string;
  majors: number;
  classes: number;
  students: number;
}
