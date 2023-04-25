import { Test, TestingModule } from '@nestjs/testing';
import { AuthCompaniesService } from './auth-companies.service';

describe('AuthCompaniesService', () => {
  let service: AuthCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthCompaniesService],
    }).compile();

    service = module.get<AuthCompaniesService>(AuthCompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
