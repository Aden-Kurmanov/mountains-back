import { Test, TestingModule } from '@nestjs/testing';
import { HikingService } from './hiking.service';

describe('HikingService', () => {
  let service: HikingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HikingService],
    }).compile();

    service = module.get<HikingService>(HikingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
