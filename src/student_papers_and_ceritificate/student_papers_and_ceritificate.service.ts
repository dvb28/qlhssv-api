import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';
import { StudentPapersAndCeritificate } from './student_papers_and_ceritificate.entity';
import { SpacPageDto } from 'src/common/dto/spac/page.dto';
import { SpacUpdateDto } from 'src/common/dto/spac/update.dto';
import { SpacDeleteDto } from 'src/common/dto/spac/delete.dto';
import { SpacCreateDto } from 'src/common/dto/spac/create.dto';

@Injectable()
export class StudentPapersAndCeritificateService {
  constructor(
    @InjectRepository(StudentPapersAndCeritificate)
    private readonly spaceRepository: Repository<StudentPapersAndCeritificate>,
  ) {}

  // [SERVICE] Create
  async create(body: SpacCreateDto): Promise<StudentPapersAndCeritificate> {
    // Exception
    try {
      // Created
      const spac = this.spaceRepository.create({
        ...body,
        submit_date: body?.submit_date ? new Date(body.submit_date) : null,
        give_back_date: body?.give_back_date
          ? new Date(body.give_back_date)
          : null,
      });

      // Return
      return await this.spaceRepository.save(spac);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Page
  async page(
    params: SpacPageDto,
  ): Promise<PageDateDto<StudentPapersAndCeritificate>> {
    // Limit
    const limit = 10;

    // Page size
    const size = parseInt(params.page.toString());

    // Exception
    try {
      // Destruc
      const [data, total] = await this.spaceRepository.findAndCount({
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
  async delete(params: SpacDeleteDto): Promise<number> {
    // Exception
    try {
      // Destruc
      await this.spaceRepository.delete(params.ids);

      // Return
      return params.ids.length;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Update
  async update(body: SpacUpdateDto): Promise<StudentPapersAndCeritificate> {
    // Exception
    try {
      // Data
      const { id, ...data } = body;

      // Find
      const spac = await this.spaceRepository.findOne({
        where: { id },
      });

      // Check spac
      if (!spac) {
        throw new HttpException(
          'Không tìm thấy khoa muốn cập nhật',
          HttpStatus.NOT_FOUND,
        );
      }

      // Update
      Object.assign(spac, {
        ...data,
        submit_date: data?.submit_date ? new Date(data.submit_date) : null,
        give_back_date: data?.give_back_date
          ? new Date(data.give_back_date)
          : null,
      });

      // Return
      return this.spaceRepository.save(spac);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
