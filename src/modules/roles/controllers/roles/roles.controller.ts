import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { RolesService } from "../../services/roles/roles.service";

@ApiTags("Roles")
@Controller("Roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get("List")
  getRoles() {
    return this.rolesService.getRoles();
  }
}
