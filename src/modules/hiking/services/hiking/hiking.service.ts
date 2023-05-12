import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { v4 as uuid } from "uuid";
import { Request } from "express";
import * as moment from "moment";
import { Op } from "sequelize";
import * as path from "path";
import * as fs from "fs";

import { Currencies } from "../../../currencies/models/currencies.model";
import { HikeTypes } from "../../../hike-types/models/hike-types.model";
import { Companies } from "../../../companies/models/companies.model";
import { CreateHikingDto } from "../../dto/create-hiking.dtos";
import { Levels } from "../../../levels/models/levels.model";
import { Hikings } from "../../models/hiking.model";
import { JwtService } from "@nestjs/jwt";
import { getToken } from "../../../../shared/get-token";
import { UserHikingInterest } from "../../../user-hiking-interest/models/user-hiking-interest.model";

@Injectable()
export class HikingsService {
  constructor(
    @InjectModel(Hikings) private hikingRepository: typeof Hikings,
    @InjectModel(UserHikingInterest)
    private interestRepository: typeof UserHikingInterest,
    private jwtService: JwtService
  ) {}

  getList() {
    return this.hikingRepository.findAll({
      include: [Levels, HikeTypes, Companies, Currencies]
    });
  }

  async getById(id: number) {
    const hike = await this.hikingRepository
      .findOne({
        where: {
          id
        },
        include: [Levels, HikeTypes, Companies, Currencies]
      })
      .then((hike) => {
        hike.images = (hike.images || []).map((image) => {
          return "/images/" + image;
        });
        return hike;
      });
    return {
      success: !!hike,
      result: hike
    };
  }

  async addHike(hike: CreateHikingDto, images: Express.Multer.File[]) {
    const pathImages: string[] = [];
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const imageFileName = uuid() + path.extname(images[i].originalname);
        const imagePath = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "..",
          "..",
          "public",
          "images",
          imageFileName
        );
        fs.writeFileSync(imagePath, images[i].buffer);

        pathImages.push(imageFileName);
      }
    }

    delete hike.id;

    const hiking = await this.hikingRepository.create({
      ...hike,
      ...{ images: pathImages }
    });

    return {
      success: true,
      result: hiking
    };
  }

  async editHike(hike: CreateHikingDto, images: Express.Multer.File[]) {
    const existHike = await this.hikingRepository.findOne({
      where: {
        id: hike.id
      }
    });

    const pathImages = existHike.images || [];

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const imageFileName = uuid() + path.extname(images[i].originalname);
        const imagePath = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "..",
          "..",
          "public",
          "images",
          imageFileName
        );
        fs.writeFileSync(imagePath, images[i].buffer);

        pathImages.push(imageFileName);
      }
    }

    existHike.name = hike.name;
    existHike.images = pathImages;
    existHike.description = hike.description;
    existHike.currencyId = hike.currencyId;
    existHike.endDate = hike.endDate;
    existHike.startDate = hike.startDate;
    existHike.levelId = hike.levelId;
    existHike.price = hike.price;
    existHike.typeId = hike.typeId;

    await existHike.save();

    return {
      success: true,
      result: existHike.dataValues
    };
  }

  async getUnCompleteHikes(req: Request) {
    const decoded = this.jwtService.decode(
      getToken(req.headers["authorization-company"] as string)
    );
    const companyId = decoded["companyId"];

    const hikings = await this.hikingRepository
      .findAll({
        where: {
          startDate: {
            [Op.gte]: moment().format("YYYY-MM-DD")
          },
          guideId: companyId,
          deletedAt: null
        },
        include: [Levels, HikeTypes, Companies, Currencies]
      })
      .then((data) => {
        data.forEach((hike) => {
          hike.images = (hike.images || []).map((image) => {
            return "/images/" + image;
          });
        });
        return data;
      });

    return {
      success: true,
      result: hikings
    };
  }

  async deleteHike(id: number) {
    await this.hikingRepository.update(
      {
        deletedAt: moment().format("YYYY-MM-DD HH:mm:ss")
      },
      {
        where: { id }
      }
    );
    return {
      success: true,
      result: null
    };
  }

  async deleteImage(id: number, image: string) {
    const existHike = await this.hikingRepository.findOne({
      where: {
        id
      }
    });

    const split = image.split("/");
    image = split[split.length - 1];
    existHike.images = (existHike.images || []).filter((img) => img !== image);

    fs.unlinkSync(
      path.join(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "..",
        "public",
        "images",
        image
      )
    );

    await existHike.save();

    return {
      success: true,
      result: existHike
    };
  }

  async getHikesList(query: {
    levelId: number;
    hikeTypeId: number;
    month: number;
  }) {
    const date = new Date(moment().year(), query.month - 1, 1);
    const startDate = moment(date).startOf("month").format();
    const endDate = moment(date).endOf("month").format();

    let where = {
      [Op.or]: {
        startDate: {
          [Op.and]: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
          }
        },
        endDate: {
          [Op.and]: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
          }
        }
      },
      deletedAt: {
        [Op.is]: null
      }
    };

    if (query.levelId) {
      where = { ...where, ...{ levelId: query.levelId } };
    }

    if (query.hikeTypeId) {
      where = { ...where, ...{ typeId: query.hikeTypeId } };
    }

    const hikes = await this.hikingRepository
      .findAll({
        where,
        include: [Levels, HikeTypes, Companies, Currencies]
      })
      .then((hikes) => {
        hikes.forEach((hike) => {
          hike.images = hike.images.map((image) => {
            return "/images/" + image;
          });
        });
        return hikes;
      });

    return {
      success: true,
      result: hikes
    };
  }

  async interestUser(req: Request, body: { id: number }) {
    const decoded = this.jwtService.decode(
      getToken(req.headers["authorization-user"] as string)
    );
    const isExist = await this.interestRepository.findOne({
      where: {
        hikingId: body.id,
        userId: decoded["userId"]
      }
    });

    if (isExist) {
      return {
        success: false,
        result: null,
        message: "Вы уже заявку подавали"
      };
    }

    await this.interestRepository.create({
      ...{
        hikingId: body.id,
        userId: decoded["userId"],
        comment: null
      }
    });

    return {
      success: true,
      result: null,
      message: null
    };
  }
}
