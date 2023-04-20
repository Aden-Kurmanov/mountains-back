import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Currencies } from "../../../currencies/models/currencies.model";
import { HikeTypes } from "../../../hike-types/models/hike-types.model";
import { Companies } from "../../../companies/models/companies.model";
import { Levels } from "../../../levels/models/levels.model";
import { Hikings } from "../../models/hiking.model";

@Injectable()
export class HikingsService {
  constructor(@InjectModel(Hikings) private hikingRepository: typeof Hikings) {}

  getList() {
    return this.hikingRepository.findAll({
      include: [Levels, HikeTypes, Companies, Currencies]
    });
  }
}
