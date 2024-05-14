import { MajorEnum } from 'src/common/enums/majors/majors.enum';
import { Faculty } from 'src/faculty/faculty.entity';
import { Students } from 'src/students/students.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['identifier_id'])
export class Majors {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
  })
  faculty_id: string;

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

  @Column({
    type: 'enum',
    enum: MajorEnum,
    default: MajorEnum.MAIN,
  })
  type: MajorEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Reference
  // To Faculty Table
  @ManyToOne(() => Faculty, (fct) => fct.majors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'faculty_id' })
  faculty: Faculty;

  // To Student Table (Main Majors)
  @OneToMany(() => Students, (st) => st.mmr, { cascade: true })
  mm_students: Students[];

  // To Student Table (Extra Majors)
  @OneToMany(() => Students, (st) => st.emr, { cascade: true })
  em_students: Students[];

  // To Student Table (Addmission Majors)
  @OneToMany(() => Students, (st) => st.emr, { cascade: true })
  aimr_students: Students[];
}
