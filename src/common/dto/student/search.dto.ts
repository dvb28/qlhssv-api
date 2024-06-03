import { IsNotEmpty } from 'class-validator';
import { ApproveSearchEnum } from 'src/common/enums/students/approve.search.enum';

export class StudentsSearchDto {
  @IsNotEmpty({ message: 'Trang dữ liệu không được trống' })
  page: number;

  @IsNotEmpty({ message: 'Nội dung tìm kiếm không được trống' })
  search: string;

  @IsNotEmpty({ message: 'Trường dữ liệu muốn tìm kiếm không được trống' })
  field: string;

  @IsNotEmpty({ message: 'Trạng thái xét duyệt không được trống' })
  approve: ApproveSearchEnum;
}
