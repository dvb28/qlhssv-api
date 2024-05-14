import { IsNotEmpty } from 'class-validator';
import { CourseCreateDto } from './create.dto';

export class CourseStatisReqDto {
  @IsNotEmpty({ message: 'Số khoá học không được trống' })
  id: string;
}

export class CourseStatisResDto extends CourseCreateDto {
  id: string;
  classes: number;
}
