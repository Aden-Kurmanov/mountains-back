import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { HikeTypesService } from "../../services/hike-types/hike-types.service";

@ApiTags("HikeTypes")
@Controller("HikeTypes")
export class HikeTypesController {
  constructor(private readonly hikeTypesService: HikeTypesService) {}

  @Get("List")
  getHikeTypes() {
    return this.hikeTypesService.getList();
  }
}
