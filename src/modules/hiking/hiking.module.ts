import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Hikings } from "./models/hiking.model";
import { HikingsController } from "./controllers/hiking/hiking.controller";
import { HikingsService } from "./services/hiking/hiking.service";

@Module({
  imports: [SequelizeModule.forFeature([Hikings])],
  controllers: [HikingsController],
  providers: [HikingsService]
})
export class HikingModule {}
