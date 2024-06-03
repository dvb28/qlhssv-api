import { GenderEnum } from 'src/common/enums/students/gender.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  fullname: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  avatar: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.OTHER,
  })
  gender: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
