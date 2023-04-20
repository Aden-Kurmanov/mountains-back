import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserHikingInterest } from "../../models/user-hiking-interest.model";
import { Hikings } from "../../../hiking/models/hiking.model";
import { Users } from "../../../users/models/users.model";

@Injectable()
export class UserHikingInterestService {
  constructor(
    @InjectModel(UserHikingInterest)
    private userHikingRepository: typeof UserHikingInterest
  ) {}

  getList() {
    return this.userHikingRepository.findAll({
      include: [Hikings, Users]
    });
  }
}
