import { IsEmail, IsNotEmpty } from 'class-validator';

export class StudentsUpdateDto {
  @IsNotEmpty({ message: 'Mã sinh viên không được trống' })
  id: string;

  @IsNotEmpty({ message: 'Lớp học không được trống' })
  class_id: string;

  @IsNotEmpty({ message: 'Email không được trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Số căn cước công dân không được trống' })
  cccd: string;

  @IsNotEmpty({ message: 'Tên không được trống' })
  fullname: string;

  @IsNotEmpty({ message: 'Ngày sinh không được trống' })
  date_of_birth: Date;
  place_of_birth: string;

  @IsNotEmpty({ message: 'Giới tính không được trống' })
  gender: string;
  home_town: string;

  @IsNotEmpty({ message: 'Quốc tịch không được trống' })
  nationality: string;

  @IsNotEmpty({ message: 'Tôn giáo không được trống' })
  religion: string;

  @IsNotEmpty({ message: 'Quốc gia không được trống' })
  nation: string;
  phone: string;

  @IsNotEmpty({ message: 'Trạng thái đi học không được trống' })
  state: string;

  @IsNotEmpty({ message: 'Xếp loại học tập không được trống' })
  study_rank: string;

  @IsNotEmpty({ message: 'Xếp loại hạnh kiểm không được trống' })
  morality_rank: string;

  @IsNotEmpty({ message: 'Xếp loại tốt nghiệp không được trống' })
  graduate_rank: string;

  @IsNotEmpty({ message: 'Năm tốt nghiệp không được trống' })
  graduate_year: string;
  father_name: string;
  mother_name: string;
  father_date_of_birth: Date;
  mother_date_of_birth: Date;

  @IsNotEmpty({ message: 'Hệ đào tạo không được trống' })
  hdt: string;

  @IsNotEmpty({ message: 'Chuyên ngành chính không được trống' })
  main_majors: string;
  extra_majors: string;

  @IsNotEmpty({ message: 'Số báo danh không được trống' })
  sbd: string;

  @IsNotEmpty({ message: 'Khối dự thi không được trống' })
  block: string;

  @IsNotEmpty({ message: 'Khu vực không được trống' })
  area: string;

  @IsNotEmpty({ message: 'Ngành tuyển sinh không được trống' })
  admissions_industry: string;

  @IsNotEmpty({ message: 'Điểm môn 1 không được trống' })
  suj_score_1: string;

  @IsNotEmpty({ message: 'Điểm môn 2 không được trống' })
  suj_score_2: string;

  @IsNotEmpty({ message: 'Điểm môn 3 không được trống' })
  suj_score_3: string;

  @IsNotEmpty({ message: 'Điểm cộng không được trống' })
  plus_score: string;

  @IsNotEmpty({ message: 'Điểm tổng không được trống' })
  total_score: string;

  @IsNotEmpty({ message: 'Số lần thi không được trống' })
  count: string;
}
