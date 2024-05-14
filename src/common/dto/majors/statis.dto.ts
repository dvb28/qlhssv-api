import { IsNotEmpty } from 'class-validator';
import { MajorsCreateDto } from './create.dto';

export class MajorsStatisReqDto {
  @IsNotEmpty({ message: 'Mẫ ngành không được trống' })
  id: string;
}

export class MajorsStatisResDto extends MajorsCreateDto {
  id: string;
  mm_students: number;
  em_students: number;
}
