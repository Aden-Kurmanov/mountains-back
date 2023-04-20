import { Test, TestingModule } from '@nestjs/testing';
import { UserHikingInterestService } from './user-hiking-interest.service';

describe('UserHikingInterestService', () => {
  let service: UserHikingInterestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHikingInterestService],
    }).compile();

    service = module.get<UserHikingInterestService>(UserHikingInterestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
