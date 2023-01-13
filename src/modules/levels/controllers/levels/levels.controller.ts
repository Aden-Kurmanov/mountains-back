import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LevelsService } from "../../services/levels/levels.service";

@ApiTags("Levels")
@Controller("Levels")
export class LevelsController {
  constructor(private levelsService: LevelsService) {}

  @Get("List")
  getList() {
    return this.levelsService.getList();
  }
}
