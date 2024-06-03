import { Class } from 'src/class/class.entity';
import { GenderEnum } from 'src/common/enums/students/gender.enum';
import { HDTEnum } from 'src/common/enums/students/hdt.enum';
import { StudentStateEnum } from 'src/common/enums/students/state.enum';
import { Majors } from 'src/majors/majors.entity';
import { StudentPapersAndCeritificate } from 'src/student_papers_and_ceritificate/student_papers_and_ceritificate.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Students {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  msv: string;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  class_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
    length: 255,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 12,
  })
  cccd: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  fullname: string;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: false,
  })
  date_of_birth: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  place_of_birth: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.OTHER,
    nullable: false,
  })
  gender: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
    length: 255,
  })
  home_town: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  nationality: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
    length: 255,
  })
  religion: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  nation: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
    length: 10,
  })
  phone: string;

  @Column({
    type: 'enum',
    enum: StudentStateEnum,
    nullable: false,
    default: StudentStateEnum.ACCEPTED,
  })
  state: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
    length: 255,
  })
  study_rank: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
    length: 255,
  })
  morality_rank: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
    length: 255,
  })
  graduate_rank: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
    length: 10,
  })
  graduate_year: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
    length: 255,
  })
  father_name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
    length: 255,
  })
  mother_name: string;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: true,
    default: null,
  })
  father_date_of_birth: string;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: true,
    default: null,
  })
  mother_date_of_birth: string;

  @Column({
    type: 'enum',
    enum: HDTEnum,
    nullable: false,
    default: HDTEnum.DAIHOC,
  })
  hdt: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  main_majors: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  extra_majors: string;

  @Column({
    type: 'char',
    nullable: true,
    default: null,
    length: 8,
  })
  sbd: string;

  @Column({
    type: 'char',
    nullable: true,
    default: null,
    length: 3,
  })
  block: string;

  @Column({
    type: 'int',
    nullable: true,
    default: null,
  })
  area: string;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  admissions_industry: string;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  suj_score_1: string;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  suj_score_2: string;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  suj_score_3: string;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  plus_score: string;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  total_score: string;

  @Column({
    type: 'int',
    nullable: true,
    default: null,
  })
  count: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  approve: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Reference
  // To Student Table
  @ManyToOne(() => Class, (cls) => cls.students, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'class_id' })
  classes: Class;

  // To Majors Table
  @ManyToOne(() => Majors, (mmj) => mmj.mm_students, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'main_majors' })
  mmr: Majors;

  // To Majors Table
  @ManyToOne(() => Majors, (emj) => emj.em_students, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'extra_majors' })
  emr: Majors;

  // To Majors Table
  @ManyToOne(() => Majors, (emj) => emj.aimr_students, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'admissions_industry' })
  aimr: Majors;

  // To Student Admissions Result Table
  @OneToMany(() => StudentPapersAndCeritificate, (spac) => spac.student, {
    cascade: true,
  })
  spac: StudentPapersAndCeritificate[];
}
