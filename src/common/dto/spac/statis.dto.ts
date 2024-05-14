import { IsNotEmpty } from 'class-validator';
import { SpacCreateDto } from './create.dto';

export class SpacStatisReqDto {
  @IsNotEmpty({ message: 'Mã khoa không được trống' })
  id: string;
}

export class SpacStatisResDto extends SpacCreateDto {
  id: string;
  majors: number;
  classes: number;
  students: number;
}
