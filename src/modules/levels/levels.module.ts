import { Module } from "@nestjs/common";
import { LevelsService } from "./services/levels/levels.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Levels } from "./models/levels.model";
import { LevelsController } from "./controllers/levels/levels.controller";

@Module({
  imports: [SequelizeModule.forFeature([Levels])],
  controllers: [LevelsController],
  providers: [LevelsService]
})
export class LevelsModule {}
