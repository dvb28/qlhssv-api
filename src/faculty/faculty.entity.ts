import { Class } from 'src/class/class.entity';
import { Majors } from 'src/majors/majors.entity';
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
@Unique(['identifier_id'])
export class Faculty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  desc: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  identifier_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Reference
  // To Class Table
  @OneToMany(() => Class, (cls) => cls.faculty, { cascade: true })
  classes: Class[];

  // To Faculty Table
  @OneToMany(() => Class, (mj) => mj.faculty, { cascade: true })
  majors: Majors[];
}
