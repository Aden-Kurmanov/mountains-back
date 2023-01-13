import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { RolesController } from "./controllers/roles/roles.controller";
import { RolesService } from "./services/roles/roles.service";
import { Roles } from "./models/roles.model";

@Module({
  imports: [SequelizeModule.forFeature([Roles])],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
