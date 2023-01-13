import { Test, TestingModule } from '@nestjs/testing';
import { HikeTypesService } from './hike-types.service';

describe('HikeTypesService', () => {
  let service: HikeTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HikeTypesService],
    }).compile();

    service = module.get<HikeTypesService>(HikeTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
