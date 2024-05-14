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
import { Class } from './class.entity';
import { ClassService } from './class.service';
import { ClassCreateDto } from 'src/common/dto/class/create.dto';
import { ClassPageDto } from 'src/common/dto/class/page.dto';
import { ClassDeleteDto } from 'src/common/dto/class/delete.dto';
import { ClassUpdateDto } from 'src/common/dto/class/update.dto';
import { ClassStatisReqDto } from 'src/common/dto/class/statis.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}
  // [POST] /create
  @Post('create')
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) body: ClassCreateDto) {
    // Call service
    const crt = await this.classService.create(body);

    // Return
    return new ResponseData<Class>({ data: crt }, HttpStatus.CREATED);
  }

  // [GET] /page
  @Get('page')
  @HttpCode(200)
  async page(@Query(new ValidationPipe()) params: ClassPageDto) {
    // Call service
    const page = await this.classService.page(params);

    // Return
    return new ResponseData<Class>({ data: page }, HttpStatus.OK);
  }

  // [GET] /page
  @Delete('delete')
  @HttpCode(200)
  async delete(@Query(new ValidationPipe()) params: ClassDeleteDto) {
    // Call service
    const deleted = await this.classService.delete(params);

    // Return
    return new ResponseData<number>({ data: deleted }, HttpStatus.OK);
  }

  // [GET] /page
  @Put('update')
  @HttpCode(200)
  async update(@Body(new ValidationPipe()) body: ClassUpdateDto) {
    // Call service
    const updated = await this.classService.update(body);

    // Return
    return new ResponseData<Class>({ data: updated }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('all')
  @HttpCode(200)
  async excel() {
    // Call service
    const excel = await this.classService.all();

    // Return
    return new ResponseData<Class[]>({ data: excel }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('statistical')
  @HttpCode(200)
  async statistical(@Query(new ValidationPipe()) params: ClassStatisReqDto) {
    // Call service
    const statistical = await this.classService.statistical(params);

    // Return
    return new ResponseData<any>({ data: statistical }, HttpStatus.OK);
  }
}
