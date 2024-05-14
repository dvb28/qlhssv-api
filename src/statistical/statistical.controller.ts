import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { StatisticalService } from './statistical.service';
import { ResponseData } from 'src/common/global/response.data';
import { OverviewDto } from 'src/common/dto/statistical/overview.dto';
import { FacultyPageDto } from 'src/common/dto/faculty/page.dto';

@Controller('statistical')
export class StatisticalController {
  constructor(private readonly statisticalService: StatisticalService) {}

  // [GET] /overview

  @Get('overview')
  @HttpCode(200)
  async overview() {
    // Call service
    const overview = await this.statisticalService.overview();

    // Return
    return new ResponseData<OverviewDto>({ data: overview }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('faculty')
  @HttpCode(200)
  async faculty(@Query(new ValidationPipe()) params: FacultyPageDto) {
    // Call service
    const statistical = await this.statisticalService.faculty(params);

    // Return
    return new ResponseData<any>({ data: statistical }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('students_and_course')
  @HttpCode(200)
  async students_and_course() {
    // Call service
    const statistical = await this.statisticalService.students_and_course();

    // Return
    return new ResponseData<any>({ data: statistical }, HttpStatus.OK);
  }
}
