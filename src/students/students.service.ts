import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentCreateDto } from 'src/common/dto/student/create.dto';
import { Students } from './students.entity';
import { Repository } from 'typeorm';
import { StudentsPageDto } from 'src/common/dto/student/page.dto';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';
import { StudentsDeleteDto } from 'src/common/dto/student/delete.dto';
import { StudentsUpdateDto } from 'src/common/dto/student/update.dto';
import { StudentsGetDto } from 'src/common/dto/student/get.dto';
// This should be a real class/interface representing a Student entity
export type Student = any;

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
  ) {}

  // [SERVICE] Crate
  async create(body: StudentCreateDto) {
    // Exception
    try {
      // Created
      const created = this.studentsRepository.create({
        ...body,
        date_of_birth: new Date(body.date_of_birth),
        father_date_of_birth: body?.father_date_of_birth
          ? new Date(body.father_date_of_birth)
          : null,
        mother_date_of_birth: body?.mother_date_of_birth
          ? new Date(body.mother_date_of_birth)
          : null,
      });

      // Return
      return await this.studentsRepository.save(created);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Page
  async page(params: StudentsPageDto): Promise<PageDateDto<Students>> {
    // Limit
    const limit = 10;

    // Page size
    const size = parseInt(params.page.toString());

    // Exception
    try {
      // Create query
      const query = this.studentsRepository
        .createQueryBuilder('students')
        .innerJoinAndSelect(
          'students.classes',
          'class',
          'class.id = students.class_id',
        )
        .leftJoinAndSelect(
          'students.mmr',
          'majors_mmr',
          'majors_mmr.id = students.main_majors',
        )
        .leftJoinAndSelect(
          'students.emr',
          'majors_emr',
          'majors_emr.id = students.extra_majors',
        )
        .innerJoinAndSelect(
          'students.aimr',
          'aimr',
          'aimr.id = students.admissions_industry',
        )
        .select([
          'students.id',
          'students.class_id',
          'students.email',
          'students.cccd',
          'students.fullname',
          'students.date_of_birth',
          'students.place_of_birth',
          'students.gender',
          'students.home_town',
          'students.nationality',
          'students.religion',
          'students.nation',
          'students.phone',
          'students.state',
          'students.study_rank',
          'students.morality_rank',
          'students.graduate_rank',
          'students.graduate_year',
          'students.father_name',
          'students.mother_name',
          'students.father_date_of_birth',
          'students.mother_date_of_birth',
          'students.hdt',
          'students.sbd',
          'students.main_majors',
          'students.extra_majors',
          'students.block',
          'students.area',
          'students.admissions_industry',
          'students.suj_score_1',
          'students.suj_score_2',
          'students.suj_score_3',
          'students.plus_score',
          'students.total_score',
          'students.count',
          'students.created_at',
          'students.updated_at',
        ])
        .addSelect([
          'aimr.name',
          'class.name',
          'majors_mmr.name',
          'majors_emr.name',
        ])
        .skip((size - 1) * limit)
        .orderBy('students.created_at', 'ASC')
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
  async delete(params: StudentsDeleteDto): Promise<number> {
    // Exception
    try {
      // Destruc
      await this.studentsRepository.delete(params.ids);

      // Return
      return params.ids.length;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Update
  async update(body: StudentsUpdateDto): Promise<Students> {
    // Exception
    try {
      // Data
      const { id, ...data } = body;

      // Find
      const student = await this.studentsRepository.findOne({
        where: { id },
      });

      // Check student
      if (!student) {
        throw new HttpException(
          'Không tìm thấy sinh viên muốn cập nhật',
          HttpStatus.NOT_FOUND,
        );
      }

      // Update
      Object.assign(student, {
        ...data,
        date_of_birth: new Date(data.date_of_birth),
        father_date_of_birth: data?.father_date_of_birth
          ? new Date(data.father_date_of_birth)
          : null,
        mother_date_of_birth: data?.mother_date_of_birth
          ? new Date(data.mother_date_of_birth)
          : null,
      });

      // Return
      return this.studentsRepository.save(student);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Get ALl Student All
  async all(): Promise<Students[]> {
    // Exception
    try {
      // Create query
      const query = this.studentsRepository
        .createQueryBuilder('students')
        .innerJoinAndSelect(
          'students.classes',
          'class',
          'class.id = students.class_id',
        )
        .leftJoinAndSelect(
          'students.mmr',
          'majors_mmr',
          'majors_mmr.id = students.main_majors',
        )
        .leftJoinAndSelect(
          'students.emr',
          'majors_emr',
          'majors_emr.id = students.extra_majors',
        )
        .innerJoinAndSelect(
          'students.aimr',
          'aimr',
          'aimr.id = students.admissions_industry',
        )
        .select([
          'students.id',
          'students.class_id',
          'students.email',
          'students.cccd',
          'students.fullname',
          'students.date_of_birth',
          'students.place_of_birth',
          'students.gender',
          'students.home_town',
          'students.nationality',
          'students.religion',
          'students.nation',
          'students.phone',
          'students.state',
          'students.study_rank',
          'students.morality_rank',
          'students.graduate_rank',
          'students.graduate_year',
          'students.father_name',
          'students.mother_name',
          'students.father_date_of_birth',
          'students.mother_date_of_birth',
          'students.hdt',
          'students.sbd',
          'students.main_majors',
          'students.extra_majors',
          'students.block',
          'students.area',
          'students.admissions_industry',
          'students.suj_score_1',
          'students.suj_score_2',
          'students.suj_score_3',
          'students.plus_score',
          'students.total_score',
          'students.count',
          'students.created_at',
          'students.updated_at',
        ])
        .addSelect([
          'aimr.name',
          'class.name',
          'majors_mmr.name',
          'majors_emr.name',
        ]);

      // Destructuring
      const [data] = await query.getManyAndCount();

      // Return
      return data;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Get
  async get(params: StudentsGetDto): Promise<Students> {
    // Exception
    try {
      // Create query
      const query = this.studentsRepository
        .createQueryBuilder('students')
        .innerJoinAndSelect(
          'students.classes',
          'class',
          'class.id = students.class_id',
        )
        .leftJoinAndSelect(
          'students.mmr',
          'majors_mmr',
          'majors_mmr.id = students.main_majors',
        )
        .leftJoinAndSelect(
          'students.emr',
          'majors_emr',
          'majors_emr.id = students.extra_majors',
        )
        .innerJoinAndSelect(
          'students.aimr',
          'aimr',
          'aimr.id = students.admissions_industry',
        )
        .where('students.id = :id', { id: params.id })
        .select([
          'students.id',
          'students.class_id',
          'students.email',
          'students.cccd',
          'students.fullname',
          'students.date_of_birth',
          'students.place_of_birth',
          'students.gender',
          'students.home_town',
          'students.nationality',
          'students.religion',
          'students.nation',
          'students.phone',
          'students.state',
          'students.study_rank',
          'students.morality_rank',
          'students.graduate_rank',
          'students.graduate_year',
          'students.father_name',
          'students.mother_name',
          'students.father_date_of_birth',
          'students.mother_date_of_birth',
          'students.hdt',
          'students.sbd',
          'students.main_majors',
          'students.extra_majors',
          'students.block',
          'students.area',
          'students.admissions_industry',
          'students.suj_score_1',
          'students.suj_score_2',
          'students.suj_score_3',
          'students.plus_score',
          'students.total_score',
          'students.count',
          'students.created_at',
          'students.updated_at',
        ])
        .addSelect([
          'aimr.name',
          'class.name',
          'majors_mmr.name',
          'majors_emr.name',
        ]);

      // Destructuring
      const student = await query.getOne();

      // Return
      return student;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
