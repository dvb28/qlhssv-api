import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { SignUpDto } from 'src/common/dto/sign/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersUpdateDto } from 'src/common/dto/user/update.dto';
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

  // [SERVICE] Update
  async update(body: UsersUpdateDto): Promise<Users> {
    // Exception
    try {
      // Data
      const { id, password, confirm, ...data } = body;

      // Find
      const user = await this.userRepository.findOne({
        where: { id },
      });

      // Check student
      if (!user) {
        throw new HttpException(
          'Không tìm thấy người dùng muốn cập nhật',
          HttpStatus.NOT_FOUND,
        );
      }

      // Check password matching
      if (password !== confirm) {
        throw new HttpException(
          'Xác nhận mật khẩu không hợp lệ',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Match
      const isMatch = await bcrypt.compare(password, user?.password);

      // Check password
      if (!isMatch) {
        throw new HttpException('Mật khẩu không đúng', HttpStatus.BAD_REQUEST);
      }

      // Update
      Object.assign(user, data);

      // Return
      return this.userRepository.save(user);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
