import { IsNotEmpty } from 'class-validator';

export class SpacCreateDto {
  @IsNotEmpty({ message: 'ID sinh viên không được trống' })
  student_id: string;

  @IsNotEmpty({ message: 'Tên chứng chỉ không được trống' })
  name: string;

  file: string;

  @IsNotEmpty({ message: 'Trạng thái trả không được trống' })
  give_back: boolean;
  give_back_note: string;
  submit_note: string;
  give_back_date: Date;
  is_submit?: boolean;
  submit_date?: Date;
}
