import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseData } from 'src/common/global/response.data';
import { StudentPapersAndCeritificateService } from './student_papers_and_ceritificate.service';
import { SpacCreateDto } from 'src/common/dto/spac/create.dto';
import { StudentPapersAndCeritificate } from './student_papers_and_ceritificate.entity';
import { SpacPageDto } from 'src/common/dto/spac/page.dto';
import { SpacDeleteDto } from 'src/common/dto/spac/delete.dto';
import { SpacUpdateDto } from 'src/common/dto/spac/update.dto';

@Controller('student-papers-and-ceritificate')
export class StudentPapersAndCeritificateController {
  constructor(
    private readonly spacService: StudentPapersAndCeritificateService,
  ) {}

  // [POST] /create
  @Post('create')
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) body: SpacCreateDto) {
    // Call service
    const crt = await this.spacService.create(body);

    // Return
    return new ResponseData<StudentPapersAndCeritificate>(
      { data: crt },
      HttpStatus.CREATED,
    );
  }

  // [GET] /page
  @Get('page')
  @HttpCode(200)
  async page(@Query(new ValidationPipe()) params: SpacPageDto) {
    // Call service
    const page = await this.spacService.page(params);

    // Return
    return new ResponseData<StudentPapersAndCeritificate>(
      { data: page },
      HttpStatus.OK,
    );
  }

  // [GET] /page
  @Delete('delete')
  @HttpCode(200)
  async delete(@Query(new ValidationPipe()) params: SpacDeleteDto) {
    // Call service
    const deleted = await this.spacService.delete(params);

    // Return
    return new ResponseData<number>({ data: deleted }, HttpStatus.OK);
  }

  // [GET] /page
  @Put('update')
  @HttpCode(200)
  async update(@Body(new ValidationPipe()) body: SpacUpdateDto) {
    // Call service
    const updated = await this.spacService.update(body);

    // Return
    return new ResponseData<StudentPapersAndCeritificate>(
      { data: updated },
      HttpStatus.OK,
    );
  }
}
