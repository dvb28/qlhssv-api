import { Course } from 'src/course/course.entity';
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
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  faculty_id: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  course_id: string;

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
  @OneToMany(() => Students, (student) => student.classes, { cascade: true })
  students: Students[];

  // To Faculty Table
  @ManyToOne(() => Faculty, (fct) => fct.classes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'faculty_id' })
  faculty: Faculty;

  // To Faculty Table
  @ManyToOne(() => Course, (c) => c.classes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
