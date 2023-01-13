import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Levels } from "../../models/levels.model";

@Injectable()
export class LevelsService {
  constructor(@InjectModel(Levels) private levelsRepository: typeof Levels) {}

  getList() {
    return this.levelsRepository.findAll();
  }
}
