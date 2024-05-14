import { Test, TestingModule } from '@nestjs/testing';
import { StudentPapersAndCeritificateService } from './student_papers_and_ceritificate.service';

describe('StudentPapersAndCeritificateService', () => {
  let service: StudentPapersAndCeritificateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentPapersAndCeritificateService],
    }).compile();

    service = module.get<StudentPapersAndCeritificateService>(StudentPapersAndCeritificateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
