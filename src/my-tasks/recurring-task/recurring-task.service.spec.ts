import { Test, TestingModule } from '@nestjs/testing';
import { RecurringTaskService } from './recurring-task.service';

describe('RecurringTaskService', () => {
  let service: RecurringTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecurringTaskService],
    }).compile();

    service = module.get<RecurringTaskService>(RecurringTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
