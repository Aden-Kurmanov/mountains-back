import { Test, TestingModule } from '@nestjs/testing';
import { HikeTypesController } from './hike-types.controller';

describe('HikeTypesController', () => {
  let controller: HikeTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HikeTypesController],
    }).compile();

    controller = module.get<HikeTypesController>(HikeTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
