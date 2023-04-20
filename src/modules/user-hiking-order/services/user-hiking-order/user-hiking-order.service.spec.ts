import { Test, TestingModule } from '@nestjs/testing';
import { UserHikingOrderService } from './user-hiking-order.service';

describe('UserHikingOrderService', () => {
  let service: UserHikingOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHikingOrderService],
    }).compile();

    service = module.get<UserHikingOrderService>(UserHikingOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
