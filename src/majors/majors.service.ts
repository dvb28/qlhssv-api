import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FacultyCreateDto } from 'src/common/dto/faculty/create.dto';
import { FacultyPageDto } from 'src/common/dto/faculty/page.dto';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';
import { FacultyDeleteDto } from 'src/common/dto/faculty/delete.dto';
import { FacultyUpdateDto } from 'src/common/dto/faculty/update.dto';
import { Majors } from './majors.entity';
import {
  MajorsStatisReqDto,
  MajorsStatisResDto,
} from 'src/common/dto/majors/statis.dto';
import { MajorsSearchDto } from 'src/common/dto/majors/search.dto';

@Injectable()
export class MajorsService {
  constructor(
    @InjectRepository(Majors)
    private readonly majorsRepository: Repository<Majors>,
  ) {}

  // [SERVICE] Create
  async create(body: FacultyCreateDto): Promise<Majors> {
    // Exception
    try {
      // Created
      const faculty = this.majorsRepository.create(body);

      // Return
      return await this.majorsRepository.save(faculty);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Page
  async page(params: FacultyPageDto): Promise<PageDateDto<Majors>> {
    // Limit
    const limit = 10;

    // Page size
    const size = parseInt(params.page.toString());

    // Exception
    try {
      // Create query
      const query = this.majorsRepository
        .createQueryBuilder('majors')
        .leftJoinAndSelect(
          'majors.faculty',
          'faculty',
          'faculty.id = majors.faculty_id',
        )
        .select([
          'majors.id',
          'majors.faculty_id',
          'majors.name',
          'majors.desc',
          'majors.identifier_id',
          'majors.type',
          'majors.created_at',
          'majors.updated_at',
        ])
        .addSelect(['faculty.name'])
        .skip((size - 1) * limit)
        .orderBy('majors.created_at', 'ASC')
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
  async delete(params: FacultyDeleteDto): Promise<number> {
    // Exception
    try {
      // Destruc
      await this.majorsRepository.delete(params.ids);

      // Return
      return params.ids.length;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Update
  async update(body: FacultyUpdateDto): Promise<Majors> {
    // Exception
    try {
      // Data
      const { id, ...data } = body;

      // Find
      const majors = await this.majorsRepository.findOne({
        where: { id },
      });

      // Check majors
      if (!majors) {
        throw new HttpException(
          'Không tìm thấy ngành muốn cập nhật',
          HttpStatus.NOT_FOUND,
        );
      }

      // Update
      Object.assign(majors, data);

      // Return
      return this.majorsRepository.save(majors);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Generate Excel File
  async all(): Promise<Majors[]> {
    // Exception
    try {
      // Destruc
      const all = await this.majorsRepository.find();

      // Return
      return all;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Statistical
  async statistical(params: MajorsStatisReqDto): Promise<MajorsStatisResDto> {
    // Exception
    try {
      // Create query
      const facultyQuery = await this.majorsRepository
        .createQueryBuilder('majors')
        .leftJoinAndSelect(
          'majors.mm_students',
          'mmr',
          'majors.id = mmr.main_majors',
        )
        .leftJoinAndSelect(
          'majors.em_students',
          'emr',
          'majors.id = emr.extra_majors',
        )
        .where('majors.id = :id', { id: params.id })
        .select([
          'majors.id',
          'majors.name',
          'majors.desc',
          'majors.identifier_id',
          'majors.created_at',
          'majors.updated_at',
          'mmr.id',
          'emr.id',
        ])
        .getOne();

      // Return
      return {
        ...facultyQuery,
        mm_students: facultyQuery.mm_students.length,
        em_students: facultyQuery.em_students.length,
      };
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Search with column
  async search(params: MajorsSearchDto): Promise<PageDateDto<Majors>> {
    // Limit
    const limit = 10;

    // Page size
    const size = parseInt(params.page.toString());

    // Exception
    try {
      // Destruc
      const query = this.majorsRepository
        .createQueryBuilder('majors')
        .where(`majors.${params.field} LIKE :search`, {
          search: `%${params.search}%`,
        })
        .skip((size - 1) * limit)
        .orderBy('majors.created_at', 'ASC')
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
}
