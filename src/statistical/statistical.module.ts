import { Module } from '@nestjs/common';
import { StatisticalController } from './statistical.controller';
import { StatisticalService } from './statistical.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from 'src/students/students.entity';
import { Class } from 'src/class/class.entity';
import { Course } from 'src/course/course.entity';
import { Majors } from 'src/majors/majors.entity';
import { Faculty } from 'src/faculty/faculty.entity';
import { FacultyModule } from 'src/faculty/faculty.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Students, Class, Course, Majors, Faculty]),
    FacultyModule,
  ],
  controllers: [StatisticalController],
  providers: [StatisticalService],
})
export class StatisticalModule {}
