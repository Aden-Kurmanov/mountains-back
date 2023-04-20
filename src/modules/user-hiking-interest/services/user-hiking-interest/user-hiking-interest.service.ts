import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserHikingInterest } from "../../models/user-hiking-interest.model";

@Injectable()
export class UserHikingInterestService {
  constructor(
    @InjectModel(UserHikingInterest)
    private userHikingRepository: typeof UserHikingInterest
  ) {}

  getList() {
    return this.userHikingRepository.findAll();
  }
}
