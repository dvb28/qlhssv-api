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
import { CourseCreateDto } from 'src/common/dto/course/create.dto';
import { CoursePageDto } from 'src/common/dto/course/page.dto';
import { ResponseData } from 'src/common/global/response.data';
import { CourseDeleteDto } from 'src/common/dto/course/delete.dto';
import { CourseUpdateDto } from 'src/common/dto/course/update.dto';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { CourseStatisReqDto } from 'src/common/dto/course/statis.dto';
import { CourseSearchDto } from 'src/common/dto/course/search.dto';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // [POST] /create
  @Post('create')
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) body: CourseCreateDto) {
    // Call service
    const crt = await this.courseService.create(body);

    // Return
    return new ResponseData<Course>({ data: crt }, HttpStatus.CREATED);
  }

  // [GET] /page
  @Get('page')
  @HttpCode(200)
  async page(@Query(new ValidationPipe()) params: CoursePageDto) {
    // Call service
    const page = await this.courseService.page(params);

    // Return
    return new ResponseData<Course>({ data: page }, HttpStatus.OK);
  }

  // [GET] /page
  @Delete('delete')
  @HttpCode(200)
  async delete(@Query(new ValidationPipe()) params: CourseDeleteDto) {
    // Call service
    const deleted = await this.courseService.delete(params);

    // Return
    return new ResponseData<number>({ data: deleted }, HttpStatus.OK);
  }

  // [GET] /page
  @Put('update')
  @HttpCode(200)
  async update(@Body(new ValidationPipe()) body: CourseUpdateDto) {
    // Call service
    const updated = await this.courseService.update(body);

    // Return
    return new ResponseData<Course>({ data: updated }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('all')
  @HttpCode(200)
  async all() {
    // Call service
    const all = await this.courseService.all();

    // Return
    return new ResponseData<Course[]>({ data: all }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('statistical')
  @HttpCode(200)
  async statistical(@Query(new ValidationPipe()) params: CourseStatisReqDto) {
    // Call service
    const statistical = await this.courseService.statistical(params);

    // Return
    return new ResponseData<any>({ data: statistical }, HttpStatus.OK);
  }

  // [GET] /search
  @Get('search')
  @HttpCode(200)
  async search(@Query(new ValidationPipe()) params: CourseSearchDto) {
    // Call service
    const search = await this.courseService.search(params);

    // Return
    return new ResponseData<PageDateDto<Course>>(
      { data: search },
      HttpStatus.OK,
    );
  }
}
