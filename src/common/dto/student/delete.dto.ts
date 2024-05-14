import { IsNotEmpty } from 'class-validator';

export class StudentsDeleteDto {
  @IsNotEmpty({ message: 'Không có ID nào để xoá' })
  ids: string[];
}
