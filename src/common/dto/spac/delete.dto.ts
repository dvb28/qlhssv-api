import { IsNotEmpty } from 'class-validator';

export class SpacDeleteDto {
  @IsNotEmpty({ message: 'Không có ID nào để xoá' })
  ids: string[];

  files: string[];
}
