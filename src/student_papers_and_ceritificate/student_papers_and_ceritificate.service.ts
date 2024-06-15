import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, EntityManager, InsertResult } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';
import { StudentPapersAndCeritificate } from './student_papers_and_ceritificate.entity';
import { SpacPageDto } from 'src/common/dto/spac/page.dto';
import { SpacUpdateDto } from 'src/common/dto/spac/update.dto';
import { SpacDeleteDto } from 'src/common/dto/spac/delete.dto';
import { SpacCreateDto } from 'src/common/dto/spac/create.dto';
import * as FileSaver from 'fs';

@Injectable()
export class StudentPapersAndCeritificateService {
  constructor(
    @InjectRepository(StudentPapersAndCeritificate)
    private readonly spacRepository: Repository<StudentPapersAndCeritificate>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  // [SERVICE] Create
  async create(body: SpacCreateDto): Promise<StudentPapersAndCeritificate> {
    // Exception
    try {
      // Temp
      const temp = Boolean(body?.file?.length > 0)
        ? {
            is_submit: true,
            file: `files/spac/${body.file}`,
            submit_date: new Date(),
          }
        : { file: null };

      // Created
      const spac = this.spacRepository.create({
        ...body,
        ...temp,
        give_back_date: body?.give_back_date
          ? new Date(body.give_back_date)
          : null,
      });

      // Return
      return await this.spacRepository.save(spac);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  // [SERVICE] Create
  async multiple_create(body: SpacCreateDto[]): Promise<InsertResult> {
    // Exception
    try {
      // Created
      const inserted = await this.spacRepository.insert(
        body.map((item) => ({
          ...item,
          submit_date: new Date(),
        })),
      );

      // Return
      return inserted;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.CONFLICT);
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
      const [data, total] = await this.spacRepository.findAndCount({
        where: { student_id: params.student_id },
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
  async delete(params: SpacDeleteDto): Promise<any> {
    // Exception
    try {
      await this.entityManager.transaction(async (manager) => {
        const deleted = await manager.delete(
          StudentPapersAndCeritificate,
          params.ids,
        );

        if (params.files?.length > 0) {
          params.files.forEach((file) => {
            file && FileSaver.unlinkSync(`./public/${file}`);
          });
        }

        // Return
        return deleted?.affected !== 0;
      });
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
      const spac = await this.spacRepository.findOne({
        where: { id },
      });

      // Check spac
      if (!spac) {
        throw new HttpException(
          'Không tìm thấy chứng chỉ muốn cập nhật',
          HttpStatus.NOT_FOUND,
        );
      }

      // Check and delete file
      if (typeof body?.file === 'string' && spac?.file && body?.file) {
        FileSaver.unlinkSync(`./public/${spac.file}`);
      }

      // Temp
      const temp =
        typeof body?.file === 'string'
          ? body?.file?.length > 0
            ? {
                is_submit: true,
                file: `files/spac/${body.file}`,
                submit_date: new Date(),
              }
            : { file: null }
          : { file: spac?.file };

      // Update
      Object.assign(spac, {
        ...data,
        ...temp,
        give_back_date: data?.give_back_date
          ? new Date(data.give_back_date)
          : null,
      });

      // Return
      return this.spacRepository.save(spac);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
