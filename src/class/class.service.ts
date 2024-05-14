import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';
import { Class } from './class.entity';
import { ClassCreateDto } from 'src/common/dto/class/create.dto';
import { ClassPageDto } from 'src/common/dto/class/page.dto';
import { ClassDeleteDto } from 'src/common/dto/class/delete.dto';
import { ClassUpdateDto } from 'src/common/dto/class/update.dto';
import { ClassDataDto } from 'src/common/dto/class/data.dto';
import {
  ClassStatisReqDto,
  ClassStatisResDto,
} from 'src/common/dto/class/statis.dto';
import { StudentStateEnum } from 'src/common/enums/students/state.enum';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  // [SERVICE] Create
  async create(body: ClassCreateDto): Promise<Class> {
    // Exception
    try {
      // Created
      const faculty = this.classRepository.create(body);

      // Return
      return await this.classRepository.save(faculty);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Page
  async page(params: ClassPageDto): Promise<PageDateDto<ClassDataDto>> {
    // Limit
    const limit = 10;

    // Page size
    const size = parseInt(params.page.toString());

    // Exception
    try {
      // Create query
      const query = this.classRepository
        .createQueryBuilder('class')
        .innerJoinAndSelect(
          'class.faculty',
          'faculty',
          'faculty.id = class.faculty_id',
        )
        .innerJoinAndSelect(
          'class.course',
          'course',
          'course.id = class.course_id',
        )
        .select([
          'class.id',
          'class.name',
          'class.desc',
          'class.course_id',
          'class.faculty_id',
          'class.identifier_id',
          'class.created_at',
          'class.updated_at',
        ])
        .addSelect(['faculty.name', 'course.name'])
        .skip((size - 1) * limit)
        .orderBy('class.created_at', 'ASC')
        .take(limit);

      // Destructuring
      const [data, total] = await query.getManyAndCount();

      // Return
      return {
        data,
        total,
        limit,
        page: size,
        pages: Math.ceil(total / limit),
      };
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Delete
  async delete(params: ClassDeleteDto): Promise<number> {
    // Exception
    try {
      // Destruc
      await this.classRepository.delete(params.ids);

      // Return
      return params.ids.length;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Update
  async update(body: ClassUpdateDto): Promise<Class> {
    // Exception
    try {
      // Data
      const { id, ...data } = body;

      // Find
      const classes = await this.classRepository.findOne({
        where: { id },
      });

      // Check classes
      if (!classes) {
        throw new HttpException(
          'Không tìm thấy lớp muốn cập nhật',
          HttpStatus.NOT_FOUND,
        );
      }

      // Update
      Object.assign(classes, data);

      // Return
      return this.classRepository.save(classes);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Generate Excel File
  async all(): Promise<Class[]> {
    // Exception
    try {
      // Create query
      const query = this.classRepository
        .createQueryBuilder('class')
        .innerJoinAndSelect(
          'class.faculty',
          'faculty',
          'faculty.id = class.faculty_id',
        )
        .innerJoinAndSelect(
          'class.course',
          'course',
          'course.id = class.course_id',
        )
        .select([
          'class.id',
          'class.name',
          'class.desc',
          'class.course_id',
          'class.faculty_id',
          'class.identifier_id',
          'class.created_at',
          'class.updated_at',
        ])
        .addSelect(['faculty.name', 'course.name'])
        .orderBy('class.created_at', 'ASC');

      // Destructuring
      const [data] = await query.getManyAndCount();

      // Return
      return data;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Statistical
  async statistical(params: ClassStatisReqDto): Promise<ClassStatisResDto> {
    // Exception
    try {
      // Create query
      const courseQuery = await this.classRepository
        .createQueryBuilder('class')
        .leftJoinAndSelect(
          'class.students',
          'students',
          'class.id = students.class_id',
        )
        .leftJoinAndSelect(
          'class.faculty',
          'faculty',
          'faculty.id = class.faculty_id',
        )
        .leftJoinAndSelect(
          'class.course',
          'course',
          'course.id = class.course_id',
        )
        .where('class.id = :id', { id: params.id })
        .select([
          'class.id',
          'class.name',
          'class.desc',
          'class.identifier_id',
          'faculty.name',
          'students.state',
          'course.name',
          'class.created_at',
          'class.updated_at',
        ])
        .getOne();

      // Variable
      let students_rejected: number = 0;
      let students_accepted: number = 0;
      let students_pending: number = 0;

      // Loop
      courseQuery.students.forEach((item: any) => {
        // Check
        switch (item.state) {
          case StudentStateEnum.REJECTED:
            students_rejected += 1;
            break;
          case StudentStateEnum.ACCEPTED:
            students_accepted += 1;
            break;
          case StudentStateEnum.PENDING:
            students_pending += 1;
            break;
        }
      });
      // Return
      return {
        ...courseQuery,
        students: courseQuery.students.length,
        students_rejected,
        students_accepted,
        students_pending,
      };
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
