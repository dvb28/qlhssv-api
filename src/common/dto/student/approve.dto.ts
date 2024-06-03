import { IsNotEmpty } from 'class-validator';

export class StudentsApproveDto {
  @IsNotEmpty({ message: 'Mã sinh viên không được trống' })
  id: string;
}
