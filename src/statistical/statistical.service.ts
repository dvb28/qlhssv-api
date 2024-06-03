import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/class/class.entity';
import { FacultyPageDto } from 'src/common/dto/faculty/page.dto';
import { FacultyStatisResDto } from 'src/common/dto/faculty/statis.dto';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';
import { OverviewDto } from 'src/common/dto/statistical/overview.dto';
import { GenderEnum } from 'src/common/enums/students/gender.enum';
import { StudentStateEnum } from 'src/common/enums/students/state.enum';
import { Course } from 'src/course/course.entity';
import { Faculty } from 'src/faculty/faculty.entity';
import { FacultyService } from 'src/faculty/faculty.service';
import { Majors } from 'src/majors/majors.entity';
import { Students } from 'src/students/students.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticalService {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultyRepository: Repository<Faculty>,
    @InjectRepository(Students)
    private readonly studentsRepository: Repository<Students>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Majors)
    private readonly majorsRepository: Repository<Majors>,
    private readonly facultyServices: FacultyService,
  ) {}

  // [SERVICE] Overview
  async overview(): Promise<OverviewDto> {
    // Exception
    try {
      const [faculty, students, classes, course, majors] = await Promise.all([
        this.facultyRepository.createQueryBuilder().getCount(),
        this.studentsRepository.createQueryBuilder().getCount(),
        this.classRepository.createQueryBuilder().getCount(),
        this.courseRepository.createQueryBuilder().getCount(),
        this.majorsRepository.createQueryBuilder().getCount(),
      ]);

      // Return
      return { faculty, students, classes, course, majors };
    } catch (error) {
      // throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Statistical Faculty
  async faculty(
    params: FacultyPageDto,
  ): Promise<PageDateDto<FacultyStatisResDto>> {
    // Limit
    const limit = 5;

    // Page size
    const size = parseInt(params.page.toString());

    // Exception
    try {
      // Create query
      const facultyQuery = this.facultyRepository
        .createQueryBuilder('faculty')
        .select(['faculty.id', 'faculty.created_at'])
        .skip((size - 1) * limit)
        .orderBy('faculty.created_at', 'ASC')
        .take(limit);

      // Destructuring
      const [data, total] = await facultyQuery.getManyAndCount();

      // Result
      const result = await Promise.all(
        data.map(async (obj) => {
          return await this.facultyServices.statistical({ id: obj.id });
        }),
      );

      // Return
      return {
        total,
        limit,
        page: size,
        data: result,
        pages: Math.ceil(total / limit),
      };
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Statistical Student and Course
  async students_and_course(): Promise<any> {
    // Exception
    try {
      const [
        male,
        female,
        rejected,
        approve_true,
        approve_false,
        accepted,
        pending,
        notyet,
        course,
        graduate,
      ] = await Promise.all([
        this.studentsRepository
          .createQueryBuilder('students')
          .where('students.gender = :gender', { gender: GenderEnum.MALE })
          .getCount(),
        this.studentsRepository
          .createQueryBuilder('students')
          .where('students.gender = :gender', { gender: GenderEnum.FEMALE })
          .getCount(),
        this.studentsRepository
          .createQueryBuilder('students')
          .where('students.state = :state', {
            state: StudentStateEnum.REJECTED,
          })
          .getCount(),
        this.studentsRepository
          .createQueryBuilder('students')
          .where('students.approve = :approve', {
            approve: true,
          })
          .getCount(),
        this.studentsRepository
          .createQueryBuilder('students')
          .where('students.approve = :approve', {
            approve: false,
          })
          .getCount(),
        this.studentsRepository
          .createQueryBuilder('students')
          .where('students.state = :state', {
            state: StudentStateEnum.ACCEPTED,
          })
          .getCount(),
        this.studentsRepository
          .createQueryBuilder('students')
          .where('students.state = :state', {
            state: StudentStateEnum.PENDING,
          })
          .getCount(),
        this.studentsRepository
          .createQueryBuilder('students')
          .where('students.state = :state', {
            state: StudentStateEnum.NOTYET,
          })
          .getCount(),
        this.courseRepository.createQueryBuilder().getCount(),
        this.courseRepository
          .createQueryBuilder('course')
          .where('course.is_graduate = :is_graduate', {
            is_graduate: 0,
          })
          .getCount(),
      ]);

      // Return
      return {
        male,
        female,
        rejected,
        accepted,
        pending,
        course,
        graduate,
        approve_true,
        approve_false,
        notyet,
      };
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
