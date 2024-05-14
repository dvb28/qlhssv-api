import { IsNotEmpty } from 'class-validator';

export class FacultyDeleteDto {
  @IsNotEmpty({ message: 'Không có ID nào để xoá' })
  ids: string[];
}
