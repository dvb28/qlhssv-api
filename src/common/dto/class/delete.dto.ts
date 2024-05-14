import { IsNotEmpty } from 'class-validator';

export class ClassDeleteDto {
  @IsNotEmpty({ message: 'Không có ID nào để xoá' })
  ids: string[];
}
