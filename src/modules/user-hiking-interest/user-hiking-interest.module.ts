import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserHikingInterest } from "./models/user-hiking-interest.model";
import { UserHikingInterestController } from "./controllers/user-hiking-interest/user-hiking-interest.controller";
import { UserHikingInterestService } from "./services/user-hiking-interest/user-hiking-interest.service";

@Module({
  imports: [SequelizeModule.forFeature([UserHikingInterest])],
  controllers: [UserHikingInterestController],
  providers: [UserHikingInterestService]
})
export class UserHikingInterestModule {}
