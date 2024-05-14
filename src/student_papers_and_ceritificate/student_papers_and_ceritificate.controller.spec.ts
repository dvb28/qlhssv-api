import { Test, TestingModule } from '@nestjs/testing';
import { StudentPapersAndCeritificateController } from './student_papers_and_ceritificate.controller';

describe('StudentPapersAndCeritificateController', () => {
  let controller: StudentPapersAndCeritificateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentPapersAndCeritificateController],
    }).compile();

    controller = module.get<StudentPapersAndCeritificateController>(
      StudentPapersAndCeritificateController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
