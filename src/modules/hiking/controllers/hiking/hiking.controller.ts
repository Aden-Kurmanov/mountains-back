import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HikingService } from "../../services/hiking/hiking.service";

@ApiTags("Hiking")
@Controller("Hiking")
export class HikingController {
  constructor(private hikingService: HikingService) {}

  @Get("List")
  getList() {
    return this.hikingService.getList();
  }
}
