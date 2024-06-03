import { Students } from 'src/students/students.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class StudentPapersAndCeritificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  student_id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  is_submit: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  submit_note: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  file: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  give_back: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  give_back_note: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  give_back_date: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  submit_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Reference
  // To Class Table
  @ManyToOne(() => Students, (std) => std.spac, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: Students;
}
