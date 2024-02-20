import { Test, TestingModule } from '@nestjs/testing';
import { RecurringTaskController } from './recurring-task.controller';
import { RecurringTaskService } from './recurring-task.service';

describe('RecurringTaskController', () => {
  let controller: RecurringTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecurringTaskController],
      providers: [RecurringTaskService],
    }).compile();

    controller = module.get<RecurringTaskController>(RecurringTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
