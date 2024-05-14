import { IsNotEmpty } from 'class-validator';

export class CourseDeleteDto {
  @IsNotEmpty({ message: 'Không có ID nào để xoá' })
  ids: string[];
}
