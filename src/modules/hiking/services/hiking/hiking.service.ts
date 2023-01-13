import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Hiking } from "../../models/hiking.model";

@Injectable()
export class HikingService {
  constructor(@InjectModel(Hiking) private hikingRepository: typeof Hiking) {}

  getList() {
    return this.hikingRepository.findAll();
  }
}
