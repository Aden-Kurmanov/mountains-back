import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Hiking } from "./models/hiking.model";
import { HikingController } from "./controllers/hiking/hiking.controller";
import { HikingService } from "./services/hiking/hiking.service";

@Module({
  imports: [SequelizeModule.forFeature([Hiking])],
  controllers: [HikingController],
  providers: [HikingService]
})
export class HikingModule {}
