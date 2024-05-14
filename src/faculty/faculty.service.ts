import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Faculty } from './faculty.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FacultyCreateDto } from 'src/common/dto/faculty/create.dto';
import { FacultyPageDto } from 'src/common/dto/faculty/page.dto';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';
import { FacultyDeleteDto } from 'src/common/dto/faculty/delete.dto';
import { FacultyUpdateDto } from 'src/common/dto/faculty/update.dto';
import {
  FacultyStatisReqDto,
  FacultyStatisResDto,
} from 'src/common/dto/faculty/statis.dto';
import { Students } from 'src/students/students.entity';
import { FacultySearchDto } from 'src/common/dto/faculty/search.dto';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultyRepository: Repository<Faculty>,
    @InjectRepository(Students)
    private readonly studentsRepository: Repository<Students>,
  ) {}

  // [SERVICE] Create
  async create(body: FacultyCreateDto): Promise<Faculty> {
    // Exception
    try {
      // Created
      const faculty = this.facultyRepository.create(body);

      // Return
      return await this.facultyRepository.save(faculty);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Page
  async page(params: FacultyPageDto): Promise<PageDateDto<Faculty>> {
    // Limit
    const limit = 10;

    // Page size
    const size = parseInt(params.page.toString());

    // Exception
    try {
      // Destruc
      const [data, total] = await this.facultyRepository.findAndCount({
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
  async delete(params: FacultyDeleteDto): Promise<number> {
    // Exception
    try {
      // Destruc
      await this.facultyRepository.delete(params.ids);

      // Return
      return params.ids.length;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Update
  async update(body: FacultyUpdateDto): Promise<Faculty> {
    // Exception
    try {
      // Data
      const { id, ...data } = body;

      // Find
      const faculty = await this.facultyRepository.findOne({
        where: { id },
      });

      // Check faculty
      if (!faculty) {
        throw new HttpException(
          'Không tìm thấy khoa muốn cập nhật',
          HttpStatus.NOT_FOUND,
        );
      }

      // Update
      Object.assign(faculty, data);

      // Return
      return this.facultyRepository.save(faculty);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Generate Excel File
  async all(): Promise<Faculty[]> {
    // Exception
    try {
      // Destruc
      const all = await this.facultyRepository.find();

      // Return
      return all;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Search with column
  async search(params: FacultySearchDto): Promise<PageDateDto<Faculty>> {
    // Limit
    const limit = 10;

    // Page size
    const size = parseInt(params.page.toString());

    // Exception
    try {
      // Destruc
      const query = this.facultyRepository
        .createQueryBuilder('faculty')
        .where(`faculty.${params.field} LIKE :search`, {
          search: `%${params.search}%`,
        })
        .skip((size - 1) * limit)
        .orderBy('faculty.created_at', 'ASC')
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

  // [SERVICE] Statistical
  async statistical(params: FacultyStatisReqDto): Promise<FacultyStatisResDto> {
    // Exception
    try {
      // Create query
      const facultyQuery = await this.facultyRepository
        .createQueryBuilder('faculty')
        .leftJoinAndSelect(
          'faculty.classes',
          'class',
          'faculty.id = class.faculty_id',
        )
        .leftJoinAndSelect(
          'faculty.majors',
          'majors',
          'faculty.id = majors.faculty_id',
        )
        .where('faculty.id = :id', { id: params.id })
        .select([
          'faculty.id',
          'faculty.name',
          'faculty.desc',
          'faculty.identifier_id',
          'faculty.created_at',
          'faculty.updated_at',
          'class.id',
          'majors.id',
        ])
        .getOne();

      // Lấy danh sách các `id` từ mảng đối tượng
      const classIds = facultyQuery?.classes?.map((obj) => obj.id);

      // Count student query
      const studentsCount =
        classIds.length > 0
          ? await this.studentsRepository
              .createQueryBuilder('students')
              .leftJoin('students.classes', 'class')
              .where('class.id IN (:...classIds)', { classIds })
              .getCount()
          : 0;

      // Return
      return {
        ...facultyQuery,
        classes: facultyQuery.classes.length,
        majors: facultyQuery.majors.length,
        students: studentsCount,
      };
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
