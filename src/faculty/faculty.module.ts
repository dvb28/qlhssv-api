import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculty } from './faculty.entity';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';
import { Students } from 'src/students/students.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty, Students])],
  controllers: [FacultyController],
  providers: [FacultyService],
  exports: [FacultyService],
})
export class FacultyModule {}
