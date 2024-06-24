import { IsNotEmpty } from 'class-validator';

export class UsersDeleteDto {
  @IsNotEmpty({ message: 'Không có ID nào để xoá' })
  ids: string[];
}
