import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { HikeTypesController } from "./controllers/hike-types/hike-types.controller";
import { HikeTypesService } from "./services/hike-types/hike-types.service";
import { HikeTypes } from "./models/hike-types.model";

@Module({
  imports: [SequelizeModule.forFeature([HikeTypes])],
  controllers: [HikeTypesController],
  providers: [HikeTypesService]
})
export class HikeTypesModule {}
