import { Class } from 'src/class/class.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  is_graduate: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  desc: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Reference
  // To Class Table
  @OneToMany(() => Class, (cls) => cls.course, { cascade: true })
  classes: Class[];
}
