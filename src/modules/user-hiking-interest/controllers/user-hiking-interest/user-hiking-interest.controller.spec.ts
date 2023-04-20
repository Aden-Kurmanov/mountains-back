import { Test, TestingModule } from '@nestjs/testing';
import { UserHikingInterestController } from './user-hiking-interest.controller';

describe('UserHikingInterestController', () => {
  let controller: UserHikingInterestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHikingInterestController],
    }).compile();

    controller = module.get<UserHikingInterestController>(UserHikingInterestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
