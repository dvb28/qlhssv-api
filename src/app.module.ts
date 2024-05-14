import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guard/roles.guard';
import { AuthGuard } from './common/guard/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { ClassController } from './class/class.controller';
import { ClassModule } from './class/class.module';
import { FacultyController } from './faculty/faculty.controller';
import { FacultyModule } from './faculty/faculty.module';
import { MajorsController } from './majors/majors.controller';
import { MajorsModule } from './majors/majors.module';
import { StudentPapersAndCeritificateController } from './student_papers_and_ceritificate/student_papers_and_ceritificate.controller';
import { StudentPapersAndCeritificateModule } from './student_papers_and_ceritificate/student_papers_and_ceritificate.module';
import { Students } from './students/students.entity';
import { Class } from './class/class.entity';
import { Faculty } from './faculty/faculty.entity';
import { Majors } from './majors/majors.entity';
import { StudentPapersAndCeritificate } from './student_papers_and_ceritificate/student_papers_and_ceritificate.entity';
import { CourseController } from './course/course.controller';
import { CourseModule } from './course/course.module';
import { Course } from './course/course.entity';
import { StatisticalModule } from './statistical/statistical.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'vietbao',
      password: 'Dvb_2002',
      database: 'qlhssv',
      entities: [
        Users,
        Students,
        Course,
        Class,
        Faculty,
        Majors,
        StudentPapersAndCeritificate,
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    StudentsModule,
    CourseModule,
    ClassModule,
    FacultyModule,
    MajorsModule,
    StudentPapersAndCeritificateModule,
    StatisticalModule,
  ],
  controllers: [
    AppController,
    ClassController,
    FacultyController,
    MajorsController,
    StudentPapersAndCeritificateController,
    CourseController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
