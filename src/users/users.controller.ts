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
import { UsersService } from './users.service';
import { ResponseData } from 'src/common/global/response.data';
import { Users } from './users.entity';
import { UsersUpdateDto } from 'src/common/dto/user/update.dto';
import { UserPageDto } from 'src/common/dto/user/page.dts';
import { SignUpDto } from 'src/common/dto/sign/sign-up.dto';
import { UsersDeleteDto } from 'src/common/dto/user/delete.dto';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enums/users/role.enum';
import { UsersUpdateRoleDto } from 'src/common/dto/user/update.role.dto';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';
import { UsersSearchDto } from 'src/common/dto/user/search.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // [GET] /page
  @Get('page')
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async page(@Query(new ValidationPipe()) body: UserPageDto) {
    // Call service
    const users = await this.usersService.page(body);

    // Return
    return new ResponseData<Users>({ data: users }, HttpStatus.OK);
  }

  // [GET] /page
  @Get('all')
  @HttpCode(200)
  async excel() {
    // Call service
    const excel = await this.usersService.all();

    // Return
    return new ResponseData<any>({ data: excel }, HttpStatus.OK);
  }

  // [GET] /search
  @Get('search')
  @HttpCode(200)
  async search(@Query(new ValidationPipe()) params: UsersSearchDto) {
    // Call service
    const search = await this.usersService.search(params);

    // Return
    return new ResponseData<PageDateDto<Users>>(
      { data: search },
      HttpStatus.OK,
    );
  }

  // [GET] /page
  @Put('update-role')
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async update_role(@Body(new ValidationPipe()) body: UsersUpdateRoleDto) {
    // Call service
    const updated = await this.usersService.update_role(body);

    // Return
    return new ResponseData<Users>({ data: updated }, HttpStatus.OK);
  }

  // [GET] /page
  @Delete('delete')
  @HttpCode(200)
  async delete(@Query(new ValidationPipe()) params: UsersDeleteDto) {
    // Call service
    const deleted = await this.usersService.delete(params);

    // Return
    return new ResponseData<number>({ data: deleted }, HttpStatus.OK);
  }

  // [GET] /add
  @Post('add')
  @HttpCode(201)
  async add(@Body(new ValidationPipe()) body: SignUpDto) {
    // Call service
    const created = await this.usersService.add(body);

    // Return
    return new ResponseData<Users>({ data: created }, HttpStatus.CREATED);
  }

  // [PUT] /update
  @Put('update')
  @HttpCode(200)
  async update(@Body(new ValidationPipe()) body: UsersUpdateDto) {
    // Call service
    const updated = await this.usersService.update(body);

    // Return
    return new ResponseData<Users>({ data: updated }, HttpStatus.OK);
  }
}
