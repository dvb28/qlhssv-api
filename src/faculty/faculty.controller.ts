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
import { FacultyService } from './faculty.service';
import { FacultyCreateDto } from 'src/common/dto/faculty/create.dto';
import { FacultyPageDto } from 'src/common/dto/faculty/page.dto';
import { ResponseData } from 'src/common/global/response.data';
import { Faculty } from './faculty.entity';
import { FacultyDeleteDto } from 'src/common/dto/faculty/delete.dto';
import { FacultyUpdateDto } from 'src/common/dto/faculty/update.dto';
import { FacultyStatisReqDto } from 'src/common/dto/faculty/statis.dto';
import { FacultySearchDto } from 'src/common/dto/faculty/search.dto';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  // [POST] /create
  @Post('create')
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) body: FacultyCreateDto) {
    // Call service
    const crt = await this.facultyService.create(body);

    // Return
    return new ResponseData<Faculty>({ data: crt }, HttpStatus.CREATED);
  }

  // [GET] /page
  @Get('page')
  @HttpCode(200)
  async page(@Query(new ValidationPipe()) params: FacultyPageDto) {
    // Call service
    const page = await this.facultyService.page(params);

    // Return
    return new ResponseData<Faculty>({ data: page }, HttpStatus.OK);
  }

  // [GET] /page
  @Delete('delete')
  @HttpCode(200)
  async delete(@Query(new ValidationPipe()) params: FacultyDeleteDto) {
    // Call service
    const deleted = await this.facultyService.delete(params);

    // Return
    return new ResponseData<number>({ data: deleted }, HttpStatus.OK);
  }

  // [GET] /page
  @Put('update')
  @HttpCode(200)
  async update(@Body(new ValidationPipe()) body: FacultyUpdateDto) {
    // Call service
    const updated = await this.facultyService.update(body);

    // Return
    return new ResponseData<Faculty>({ data: updated }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('all')
  @HttpCode(200)
  async all() {
    // Call service
    const all = await this.facultyService.all();

    // Return
    return new ResponseData<Faculty[]>({ data: all }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('statistical')
  @HttpCode(200)
  async statistical(@Query(new ValidationPipe()) params: FacultyStatisReqDto) {
    // Call service
    const statistical = await this.facultyService.statistical(params);

    // Return
    return new ResponseData<any>({ data: statistical }, HttpStatus.OK);
  }

  // [GET] /search
  @Get('search')
  @HttpCode(200)
  async search(@Query(new ValidationPipe()) params: FacultySearchDto) {
    // Call service
    const statistical = await this.facultyService.search(params);

    // Return
    return new ResponseData<PageDateDto<Faculty>>(
      { data: statistical },
      HttpStatus.OK,
    );
  }
}
