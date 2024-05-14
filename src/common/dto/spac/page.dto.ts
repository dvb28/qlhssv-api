import { IsNotEmpty } from 'class-validator';

export class SpacPageDto {
  @IsNotEmpty({ message: 'Trang dữ liệu không được trống' })
  page: number;
}
