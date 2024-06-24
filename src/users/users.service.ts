import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { SignUpDto } from 'src/common/dto/sign/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersUpdateDto } from 'src/common/dto/user/update.dto';
import { UserPageDto } from 'src/common/dto/user/page.dts';
import { PageDateDto } from 'src/common/dto/shared/data.page.dto';
import { UsersDto } from 'src/common/dto/user/users.dto';
import { Role } from 'src/common/enums/users/role.enum';
import { UsersDeleteDto } from 'src/common/dto/user/delete.dto';
import { UsersUpdateRoleDto } from 'src/common/dto/user/update.role.dto';
import { UsersSearchDto } from 'src/common/dto/user/search.dto';
// This should be a real class/interface representing a Student entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findByEmail(email: string): Promise<Users | undefined> {
    // Return
    return await this.userRepository.findOneBy({ email });
  }

  // [SERVICE] Create
  async create(signUpData: SignUpDto): Promise<User | undefined> {
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

  // [SERVICE] Update Role
  async update_role(body: UsersUpdateRoleDto): Promise<Users> {
    // Exception
    try {
      // Data
      const { id, ...roles } = body;

      // Find
      const course = await this.userRepository.findOne({
        where: { id },
      });

      // Check Course
      if (!course) {
        throw new HttpException(
          'Không tìm thấy tài khoản muốn cập nhật quyền',
          HttpStatus.NOT_FOUND,
        );
      }

      // Update
      Object.assign(course, roles);

      // Return
      return this.userRepository.save(course);
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Search with column
  async search(params: UsersSearchDto): Promise<PageDateDto<Users>> {
    // Limit
    const limit = 10;

    // Page size
    const size = parseInt(params.page.toString());

    // Exception
    try {
      // Destruc
      const query = this.userRepository
        .createQueryBuilder('users')
        .where(`users.${params.field} LIKE :search`, {
          search: `%${params.search}%`,
        })
        .skip((size - 1) * limit)
        .orderBy('users.created_at', 'ASC')
        .take(limit);

      // Destructuring
      const [data, total] = await query.getManyAndCount();

      // Return
      return {
        data,
        total,
        limit,
        page: size,
        pages: Math.ceil(total / limit),
      };
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Delete
  async delete(params: UsersDeleteDto): Promise<number> {
    // Exception
    try {
      // Destruc
      await this.userRepository.delete(params.ids);

      // Return
      return params.ids.length;
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Add
  async add(signUpData: SignUpDto): Promise<User | undefined> {
    // Exception
    try {
      const created = await this.create(signUpData);

      // Parse
      const parse = new UsersDto({
        email: signUpData.email,
        fullname: signUpData.fullname,
        ...created.generatedMaps[0],
      } as Users);

      // Created
      return parse;
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

  // [SERVICE] Page
  async page(params: UserPageDto): Promise<PageDateDto<UsersDto>> {
    // Limit
    const limit = 10;

    // Page size
    const size = parseInt(params.page.toString());

    // Exception
    try {
      // Create query
      const query = this.userRepository
        .createQueryBuilder('users')
        .where('users.roles NOT LIKE :role', { role: `%${Role.ADMIN}%` })
        .skip((size - 1) * limit)
        .orderBy('users.created_at', 'ASC')
        .take(limit);

      // Destructuring
      const [data, total] = await query.getManyAndCount();

      // Return
      return {
        total,
        limit,
        page: size,
        pages: Math.ceil(total / limit),
        data: data.map((user: Users) => new UsersDto(user)),
      };
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // [SERVICE] Generate Excel File
  async all(): Promise<User[]> {
    // Exception
    try {
      // Destruc
      const all = await this.userRepository.find();

      // Return
      return all.map((user: Users) => new UsersDto(user));
    } catch (error) {
      // Throw error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
