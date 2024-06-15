import { IsNotEmpty } from 'class-validator';

export class SpacPageDto {
  @IsNotEmpty({ message: 'Trang dữ liệu không được trống' })
  page: number;

  @IsNotEmpty({ message: 'Mã sinh viên không được trống' })
  student_id: string;
}
