import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HikingsService } from "../../services/hiking/hiking.service";

@ApiTags("Hikings")
@Controller("Hikings")
export class HikingsController {
  constructor(private service: HikingsService) {}

  @Get("List")
  getList() {
    return this.service.getList();
  }
}
