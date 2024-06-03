import { IsNotEmpty } from 'class-validator';
import { ApproveSearchEnum } from 'src/common/enums/students/approve.search.enum';

export class StudentsPageDto {
  @IsNotEmpty({ message: 'Trang dữ liệu không được trống' })
  page: number;

  @IsNotEmpty({ message: 'Trường này không được trống' })
  approve: ApproveSearchEnum;
}
