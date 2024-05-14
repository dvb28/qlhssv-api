import { IsNotEmpty } from 'class-validator';

export class SpacUpdateDto {
  @IsNotEmpty({ message: 'Thiếu ID' })
  id: string;

  @IsNotEmpty({ message: 'Tên chứng chỉ không được trống' })
  name: string;

  @IsNotEmpty({ message: 'Trạng thái nộp không được trống' })
  is_submit: boolean;

  @IsNotEmpty({ message: 'Trạng thái trả không được trống' })
  give_back: boolean;
  give_back_note: string;
  submit_note: string;
  submit_date: Date;
  give_back_date: Date;
}
