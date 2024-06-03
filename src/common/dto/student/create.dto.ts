import { IsEmail, IsNotEmpty } from 'class-validator';

export class StudentCreateDto {
  class_id: string;
  @IsNotEmpty({ message: 'Email không được trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Số căn cước công dân không được trống' })
  cccd: string;

  @IsNotEmpty({ message: 'Tên không được trống' })
  fullname: string;

  @IsNotEmpty({ message: 'Ngày sinh không được trống' })
  date_of_birth: string;
  place_of_birth: string;

  @IsNotEmpty({ message: 'Giới tính không được trống' })
  gender: string;
  home_town: string;
  nationality: string;
  religion: string;
  nation: string;
  phone: string;

  @IsNotEmpty({ message: 'Trạng thái đi học không được trống' })
  state: string;
  study_rank: string;
  morality_rank: string;
  graduate_rank: string;
  graduate_year: string;
  father_name: string;
  mother_name: string;
  father_date_of_birth: string;
  mother_date_of_birth: string;
  @IsNotEmpty({ message: 'Hệ đào tạo không được trống' })
  hdt: string;
  @IsNotEmpty({ message: 'Chuyên ngành chính không được trống' })
  main_majors: string;
  extra_majors: string;
  sbd: string;
  block: string;
  area: string;
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
