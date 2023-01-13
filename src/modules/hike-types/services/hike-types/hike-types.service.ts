import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { HikeTypes } from "../../models/hike-types.model";

@Injectable()
export class HikeTypesService {
  constructor(
    @InjectModel(HikeTypes) private hikeTypesRepository: typeof HikeTypes
  ) {}

  getList() {
    return this.hikeTypesRepository.findAll();
  }
}
