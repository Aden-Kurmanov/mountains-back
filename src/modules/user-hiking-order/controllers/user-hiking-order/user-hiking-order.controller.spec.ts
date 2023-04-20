import { Test, TestingModule } from '@nestjs/testing';
import { UserHikingOrderController } from './user-hiking-order.controller';

describe('UserHikingOrderController', () => {
  let controller: UserHikingOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHikingOrderController],
    }).compile();

    controller = module.get<UserHikingOrderController>(UserHikingOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
