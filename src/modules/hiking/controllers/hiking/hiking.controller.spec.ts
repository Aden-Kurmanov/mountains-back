import { Test, TestingModule } from '@nestjs/testing';
import { HikingController } from './hiking.controller';

describe('HikingController', () => {
  let controller: HikingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HikingController],
    }).compile();

    controller = module.get<HikingController>(HikingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
