type StudentsPageDtoDataFaculty = {
  name: string;
};

type StudentsPageDtoDataCourse = {
  name: string;
};

export class StudentsPageDtoDataDto {
  name: string;
  desc: string;
  faculty_id: string;
  faculty_name?: StudentsPageDtoDataFaculty;
  course_id: string;
  course_name?: StudentsPageDtoDataCourse;
  identifier_id: string;
  created_at: Date;
  updated_at: Date;
}
