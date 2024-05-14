import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './students.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Students])],
  providers: [StudentsService],
  exports: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
