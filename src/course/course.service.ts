import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseCreateDto } from 'src/common/dto/course/create.dto';
import { CoursePageDto } from 'src/common/dto/course/page.dto';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';
import { CourseDeleteDto } from 'src/common/dto/course/delete.dto';
import { CourseUpdateDto } from 'src/common/dto/course/update.dto';
import {
  CourseStatisReqDto,
  CourseStatisResDto,
} from 'src/common/dto/course/statis.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  // [SERVICE] Create
  async create(body: CourseCreateDto): Promise<Course> {
    // Exception
    try {
      // Created
      const course = this.courseRepository.create(body);

      // Return
      return await this.courseRepository.save(course);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Page
  async page(params: CoursePageDto): Promise<PageDateDto<Course>> {
    // Limit
    const limit = 10;

    // Page size
    const size = parseInt(params.page.toString());

    // Exception
    try {
      // Destruc
      const [data, total] = await this.courseRepository.findAndCount({
        skip: (size - 1) * limit,
        take: limit,
        order: { created_at: 'ASC' },
      });

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
  async delete(params: CourseDeleteDto): Promise<number> {
    // Exception
    try {
      // Destruc
      await this.courseRepository.delete(params.ids);

      // Return
      return params.ids.length;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Update
  async update(body: CourseUpdateDto): Promise<Course> {
    // Exception
    try {
      // Data
      const { id, ...data } = body;

      // Find
      const course = await this.courseRepository.findOne({
        where: { id },
      });

      // Check Course
      if (!course) {
        throw new HttpException(
          'Không tìm thấy khoá học muốn cập nhật',
          HttpStatus.NOT_FOUND,
        );
      }

      // Update
      Object.assign(course, data);

      // Return
      return this.courseRepository.save(course);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Generate Excel File
  async all(): Promise<Course[]> {
    // Exception
    try {
      // Destruc
      const all = await this.courseRepository.find();

      // Return
      return all;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Statistical
  async statistical(params: CourseStatisReqDto): Promise<CourseStatisResDto> {
    // Exception
    try {
      // Create query
      const courseQuery = await this.courseRepository
        .createQueryBuilder('course')
        .leftJoinAndSelect(
          'course.classes',
          'class',
          'course.id = class.course_id',
        )
        .where('course.id = :id', { id: params.id })
        .select([
          'course.id',
          'course.name',
          'course.desc',
          'course.created_at',
          'course.updated_at',
          'class.id',
        ])
        .getOne();

      // Return
      return {
        ...courseQuery,
        classes: courseQuery.classes.length,
      };
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
