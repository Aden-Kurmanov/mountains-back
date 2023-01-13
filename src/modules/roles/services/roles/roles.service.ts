import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Roles } from "../../models/roles.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private roleRepository: typeof Roles) {}

  getRoles() {
    return this.roleRepository.findAll();
  }
}
