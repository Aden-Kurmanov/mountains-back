import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Hikings } from "./models/hiking.model";
import { HikingsController } from "./controllers/hiking/hiking.controller";
import { HikingsService } from "./services/hiking/hiking.service";
import { UserHikingInterest } from "../user-hiking-interest/models/user-hiking-interest.model";
import { Users } from "../users/models/users.model";
import { UserHikingOrder } from "../user-hiking-order/models/user-hiking-order.model";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Hikings,
      UserHikingInterest,
      Users,
      UserHikingOrder
    ])
  ],
  controllers: [HikingsController],
  providers: [HikingsService]
})
export class HikingModule {}
