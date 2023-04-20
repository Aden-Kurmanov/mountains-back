import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserHikingOrder } from "./models/user-hiking-order.model";
import { UserHikingOrderService } from "./services/user-hiking-order/user-hiking-order.service";
import { UserHikingOrderController } from "./controllers/user-hiking-order/user-hiking-order.controller";

@Module({
  imports: [SequelizeModule.forFeature([UserHikingOrder])],
  providers: [UserHikingOrderService],
  controllers: [UserHikingOrderController]
})
export class UserHikingOrderModule {}
