import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserHikingOrder } from "../../models/user-hiking-order.model";
import { Hikings } from "../../../hiking/models/hiking.model";
import { Users } from "../../../users/models/users.model";

@Injectable()
export class UserHikingOrderService {
  constructor(
    @InjectModel(UserHikingOrder)
    private userHikingOrderRepository: typeof UserHikingOrder
  ) {}

  getList() {
    return this.userHikingOrderRepository.findAll({
      include: [Hikings, Users]
    });
  }
}
