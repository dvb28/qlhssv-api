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
import { StudentsService } from './students.service';
import { StudentCreateDto } from 'src/common/dto/student/create.dto';
import { ResponseMessage } from 'src/common/global/response.message';
import { ResponseData } from 'src/common/global/response.data';
import { StudentsDeleteDto } from 'src/common/dto/student/delete.dto';
import { StudentsPageDto } from 'src/common/dto/student/page.dto';
import { Students } from './students.entity';
import { StudentsUpdateDto } from 'src/common/dto/student/update.dto';
import { StudentsGetDto } from 'src/common/dto/student/get.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  // [POST] / create

  @Post()
  @HttpCode(200)
  async create(@Body() body: StudentCreateDto) {
    // Created
    await this.studentsService.create(body);

    // Return
    return new ResponseMessage('Tạo hồ sơ thành công ', HttpStatus.CREATED);
  }

  // [GET] /page
  @Get('page')
  @HttpCode(200)
  async page(@Query(new ValidationPipe()) params: StudentsPageDto) {
    // Call service
    const page = await this.studentsService.page(params);

    // Return
    return new ResponseData<Students>({ data: page }, HttpStatus.OK);
  }

  // [GET] /page
  @Delete('delete')
  @HttpCode(200)
  async delete(@Query(new ValidationPipe()) params: StudentsDeleteDto) {
    // Call service
    const deleted = await this.studentsService.delete(params);

    // Return
    return new ResponseData<number>({ data: deleted }, HttpStatus.OK);
  }

  // [GET] /page
  @Put('update')
  @HttpCode(200)
  async update(@Body(new ValidationPipe()) body: StudentsUpdateDto) {
    // Call service
    const updated = await this.studentsService.update(body);

    // Return
    return new ResponseData<Students>({ data: updated }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('all')
  @HttpCode(200)
  async all() {
    // Call service
    const all = await this.studentsService.all();

    // Return
    return new ResponseData<Students[]>({ data: all }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('get')
  @HttpCode(200)
  async get(@Query(new ValidationPipe()) params: StudentsGetDto) {
    // Call service
    const all = await this.studentsService.get(params);

    // Return
    return new ResponseData<Students[]>({ data: all }, HttpStatus.OK);
  }
}
