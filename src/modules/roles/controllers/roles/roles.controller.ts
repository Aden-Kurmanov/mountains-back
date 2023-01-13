import { Controller, Get } from "@nestjs/common";
import { RolesService } from "../../services/roles/roles.service";

@Controller("Roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  getRoles() {
    return this.rolesService.getRoles();
  }
}
