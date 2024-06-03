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
import { StudentsSearchDto } from 'src/common/dto/student/search.dto';
import { ApproveSearchEnum } from 'src/common/enums/students/approve.search.enum';
import { StudentsApproveDto } from 'src/common/dto/student/approve.dto';
import { StudentStateEnum } from 'src/common/enums/students/state.enum';
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
        state: StudentStateEnum.NOTYET,
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

    // Is Approve
    const isApprove =
      params.approve === ApproveSearchEnum.BOTH
        ? null
        : params.approve === ApproveSearchEnum.TRUE
          ? 1
          : 0;

    // Exception
    try {
      // Create query
      const query = this.studentsRepository
        .createQueryBuilder('students')
        .leftJoinAndSelect(
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
        .leftJoinAndSelect(
          'students.aimr',
          'aimr',
          'aimr.id = students.admissions_industry',
        )
        .where(`${isApprove !== null ? `students.approve = ${isApprove}` : ''}`)
        .select([
          'students.id',
          'students.class_id',
          'students.email',
          'students.cccd',
          'students.approve',
          'students.msv',
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
      const { id, admissions_industry, class_id, ...data } = body;

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
      Object.assign(student, data);

      // Check and update admissions_industry
      admissions_industry && Object.assign(student, { admissions_industry });

      // Check and update class_id
      class_id && Object.assign(student, { class_id });

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
        .leftJoinAndSelect(
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
        .leftJoinAndSelect(
          'students.aimr',
          'aimr',
          'aimr.id = students.admissions_industry',
        )
        .select([
          'students.id',
          'students.class_id',
          'students.email',
          'students.cccd',
          'students.msv',
          'students.fullname',
          'students.approve',
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
        .leftJoinAndSelect(
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
        .leftJoinAndSelect(
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
          'students.msv',
          'students.approve',
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

  // [SERVICE] Get
  async approve(params: StudentsApproveDto): Promise<Students> {
    // Exception
    try {
      // Find
      const student = await this.studentsRepository.findOne({
        where: { id: params.id },
      });

      // Check student
      if (!student) {
        throw new HttpException(
          'Không tìm thấy sinh viên muốn cập nhật',
          HttpStatus.NOT_FOUND,
        );
      }

      // Year
      const year = new Date().getFullYear();

      // Number
      const number = Date.now() + Math.random();

      // Slug
      const slug = `${year}${number.toString()}`;

      // Update
      Object.assign(student, {
        approve: true,
        msv: slug.substring(0, slug.lastIndexOf('.')),
      });

      // Return
      return this.studentsRepository.save(student);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Search with column
  async search(params: StudentsSearchDto): Promise<PageDateDto<Students>> {
    // Limit
    const limit = 10;

    // Page size
    const size = parseInt(params.page.toString());

    // Is Approve
    const isApprove =
      params.approve === ApproveSearchEnum.BOTH
        ? null
        : params.approve === ApproveSearchEnum.TRUE
          ? 1
          : 0;

    // Exception
    try {
      // Destruc
      const query = this.studentsRepository
        .createQueryBuilder('students')
        .where(
          `students.${params.field} LIKE :search ${isApprove !== null ? `AND students.approve = ${isApprove}` : ''}`,
          {
            search: `%${params.search}%`,
          },
        )
        .leftJoinAndSelect(
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
        .leftJoinAndSelect(
          'students.aimr',
          'aimr',
          'aimr.id = students.admissions_industry',
        )
        .select([
          'students.id',
          'students.class_id',
          'students.email',
          'students.cccd',
          'students.msv',
          'students.approve',
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
}
