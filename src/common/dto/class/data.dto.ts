type ClassDataFaculty = {
  name: string;
};

type ClassDataCourse = {
  name: string;
};

export class ClassDataDto {
  name: string;
  desc: string;
  faculty_id: string;
  faculty?: ClassDataFaculty;
  course_id: string;
  course?: ClassDataCourse;
  identifier_id: string;
  created_at: Date;
  updated_at: Date;
}
