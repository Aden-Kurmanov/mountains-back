import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserHikingOrderService } from "../../services/user-hiking-order/user-hiking-order.service";

@ApiTags("UserHikingOrder")
@Controller("UserHikingOrder")
export class UserHikingOrderController {
  constructor(private userHikingOrderService: UserHikingOrderService) {}

  @Get("List")
  getList() {
    return this.userHikingOrderService.getList();
  }
}
