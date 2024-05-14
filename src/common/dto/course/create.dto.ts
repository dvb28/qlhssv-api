import { IsNotEmpty } from 'class-validator';

export class CourseCreateDto {
  @IsNotEmpty({ message: 'Tên của khoá học không được trống' })
  name: string;

  @IsNotEmpty({
    message: 'Trạng thái tốt nghiệp của khoá học không được trống',
  })
  is_graduate: boolean;

  desc: string;
}
