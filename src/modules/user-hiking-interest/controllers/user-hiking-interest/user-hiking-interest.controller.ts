import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserHikingInterestService } from "../../services/user-hiking-interest/user-hiking-interest.service";

@ApiTags("UserHikingInterest")
@Controller("UserHikingInterest")
export class UserHikingInterestController {
  constructor(private userHikingService: UserHikingInterestService) {}

  @Get("List")
  getList() {
    return this.userHikingService.getList();
  }
}
