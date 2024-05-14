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
import { MajorsService } from './majors.service';
import { ResponseData } from 'src/common/global/response.data';
import { Majors } from './majors.entity';
import { MajorsUpdateDto } from 'src/common/dto/majors/update.dto';
import { MajorsDeleteDto } from 'src/common/dto/majors/delete.dto';
import { MajorsCreateDto } from 'src/common/dto/majors/create.dto';
import { MajorsPageDto } from 'src/common/dto/majors/page.dto';
import { MajorsStatisReqDto } from 'src/common/dto/majors/statis.dto';
import { MajorsSearchDto } from 'src/common/dto/majors/search.dto';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';

@Controller('majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  // [POST] /create
  @Post('create')
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) body: MajorsCreateDto) {
    // Call service
    const crt = await this.majorsService.create(body);

    // Return
    return new ResponseData<Majors>({ data: crt }, HttpStatus.CREATED);
  }

  // [GET] /page
  @Get('page')
  @HttpCode(200)
  async page(@Query(new ValidationPipe()) params: MajorsPageDto) {
    // Call service
    const page = await this.majorsService.page(params);

    // Return
    return new ResponseData<Majors>({ data: page }, HttpStatus.OK);
  }

  // [GET] /page
  @Delete('delete')
  @HttpCode(200)
  async delete(@Query(new ValidationPipe()) params: MajorsDeleteDto) {
    // Call service
    const deleted = await this.majorsService.delete(params);

    // Return
    return new ResponseData<number>({ data: deleted }, HttpStatus.OK);
  }

  // [GET] /page
  @Put('update')
  @HttpCode(200)
  async update(@Body(new ValidationPipe()) body: MajorsUpdateDto) {
    // Call service
    const updated = await this.majorsService.update(body);

    // Return
    return new ResponseData<Majors>({ data: updated }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('all')
  @HttpCode(200)
  async excel() {
    // Call service
    const excel = await this.majorsService.all();

    // Return
    return new ResponseData<Majors[]>({ data: excel }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('statistical')
  @HttpCode(200)
  async statistical(@Query(new ValidationPipe()) params: MajorsStatisReqDto) {
    // Call service
    const statistical = await this.majorsService.statistical(params);

    // Return
    return new ResponseData<any>({ data: statistical }, HttpStatus.OK);
  }

  // [GET] /search
  @Get('search')
  @HttpCode(200)
  async search(@Query(new ValidationPipe()) params: MajorsSearchDto) {
    // Call service
    const statistical = await this.majorsService.search(params);

    // Return
    return new ResponseData<PageDateDto<Majors>>(
      { data: statistical },
      HttpStatus.OK,
    );
  }
}
