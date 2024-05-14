import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Majors } from './majors.entity';
import { MajorsController } from './majors.controller';
import { MajorsService } from './majors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Majors])],
  controllers: [MajorsController],
  providers: [MajorsService],
  exports: [MajorsService],
})
export class MajorsModule {}
