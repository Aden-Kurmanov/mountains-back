import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Hikings } from "../../models/hiking.model";

@Injectable()
export class HikingsService {
  constructor(@InjectModel(Hikings) private hikingRepository: typeof Hikings) {}

  getList() {
    return this.hikingRepository.findAll();
  }
}
