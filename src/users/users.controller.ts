import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseData } from 'src/common/global/response.data';
import { Users } from './users.entity';
import { UsersUpdateDto } from 'src/common/dto/user/update.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // [GET] /update
  @Put('update')
  @HttpCode(200)
  async update(@Body(new ValidationPipe()) body: UsersUpdateDto) {
    // Call service
    const updated = await this.usersService.update(body);

    // Return
    return new ResponseData<Users>({ data: updated }, HttpStatus.OK);
  }
}
