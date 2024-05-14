import { Module } from '@nestjs/common';
import { StudentPapersAndCeritificateService } from './student_papers_and_ceritificate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentPapersAndCeritificate } from './student_papers_and_ceritificate.entity';
import { StudentPapersAndCeritificateController } from './student_papers_and_ceritificate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudentPapersAndCeritificate])],
  controllers: [StudentPapersAndCeritificateController],
  providers: [StudentPapersAndCeritificateService],
  exports: [StudentPapersAndCeritificateService],
})
export class StudentPapersAndCeritificateModule {}
