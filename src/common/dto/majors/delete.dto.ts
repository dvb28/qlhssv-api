import { IsNotEmpty } from 'class-validator';

export class MajorsDeleteDto {
  @IsNotEmpty({ message: 'Không có ID nào để xoá' })
  ids: string[];
}
