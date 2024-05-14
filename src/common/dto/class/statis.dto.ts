import { IsNotEmpty } from 'class-validator';
import { ClassCreateDto } from './create.dto';
import { Faculty } from 'src/faculty/faculty.entity';
import { Course } from 'src/course/course.entity';

export class ClassStatisReqDto {
  @IsNotEmpty({ message: 'Mã lớp không được trống' })
  id: string;
}

export class ClassStatisResDto extends ClassCreateDto {
  id: string;
  faculty: Faculty;
  course: Course;
  students: number;
  students_rejected: number;
  students_accepted: number;
  students_pending: number;
}
