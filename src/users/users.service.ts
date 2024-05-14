import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { SignUpDto } from 'src/common/dto/sign/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// This should be a real class/interface representing a Student entity
export type Student = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findByEmail(email: string): Promise<Student | undefined> {
    // Return
    return await this.userRepository.findOneBy({ email });
  }

  // [SERVICE] Create
  async create(signUpData: SignUpDto): Promise<Student | undefined> {
    // Exception
    try {
      // Created
      const created = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values({
          ...signUpData,
          password: await bcrypt.hash(signUpData.password, 10),
        })
        .execute();

      // Return
      return created;
    } catch (error) {
      // Throw Error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
