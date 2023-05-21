import { Injectable } from "@nestjs/common";
import { col, fn, literal, Op } from "sequelize";
import { InjectModel } from "@nestjs/sequelize";
import { v4 as uuid } from "uuid";
import { Request } from "express";
import * as moment from "moment";
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
import { Users } from "../../../users/models/users.model";
import { UserHikingOrder } from "../../../user-hiking-order/models/user-hiking-order.model";
import * as process from "process";

@Injectable()
export class HikingsService {
  constructor(
    @InjectModel(Hikings) private hikingRepository: typeof Hikings,
    @InjectModel(Users) private usersRepository: typeof Users,
    @InjectModel(UserHikingOrder)
    private orderRepository: typeof UserHikingOrder,
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
      try {
        for (let i = 0; i < images.length; i++) {
          const imageFileName = uuid() + path.extname(images[i].originalname);
          const baseDir = process.cwd();
          const relativePath = path.join("public", "images", imageFileName);
          const absolutePath = path.resolve(baseDir, relativePath);
          fs.writeFile(absolutePath, images[i].buffer, (error) => {
            console.log("writeFile: ", error);
          });

          pathImages.push(imageFileName);
        }
      } catch (e) {
        return {
          success: false,
          result: [],
          error: e
        };
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

    const pathImages: string[] = existHike.images || [];

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const imageFileName = uuid() + path.extname(images[i].originalname);
        const baseDir = process.cwd();
        const relativePath = path.join("public", "images", imageFileName);
        const absolutePath = path.resolve(baseDir, relativePath);
        fs.writeFile(absolutePath, images[i].buffer, (error) => {
          console.log("writeFile: ", error);
        });

        pathImages.push(imageFileName);
      }
    }

    await this.hikingRepository.update(
      {
        name: hike.name,
        images: pathImages,
        description: hike.description,
        currencyId: hike.currencyId,
        endDate: hike.endDate,
        startDate: hike.startDate,
        levelId: hike.levelId,
        price: hike.price,
        typeId: hike.typeId,
        maxPeople: hike.maxPeople
      },
      {
        where: {
          id: hike.id
        }
      }
    );

    const updated = await this.hikingRepository.findOne({
      where: {
        id: hike.id
      }
    });

    return {
      success: true,
      result: updated.dataValues
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
      .then(async (data) => {
        const orders = await this.orderRepository.findAll({
          where: {
            hikingId: {
              [Op.in]: data.map((e) => e.id)
            }
          }
        });

        data.forEach((hike) => {
          hike.images = (hike.images || []).map((image) => {
            return "/images/" + image;
          });
        });
        return data.map((hike) => {
          return {
            ...hike.dataValues,
            ...{
              countPeople: orders.filter((e) => e.hikingId === hike.id).length
            }
          };
        });
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

  async getInterestUsersByHikeId(id: number) {
    const interestUsers = await this.interestRepository.findAll({
      where: {
        hikingId: id
      }
    });

    const users = await this.usersRepository
      .findAll({
        where: {
          id: {
            [Op.in]: interestUsers.map((e) => e.userId)
          }
        }
      })
      .then(async (users) => {
        const orderUsers = await this.orderRepository.findAll({
          where: {
            hikingId: id
          }
        });

        return users.map((user) => {
          return {
            ...user.dataValues,
            ...{
              isAddedToHike: !!orderUsers.some((e) => e.userId === user.id)
            }
          };
        });
      });

    return {
      success: true,
      result: users.map((user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          patronymic: user.patronymic,
          email: user.email,
          phone: user.phone,
          instagram: user.instagram,
          isAddedToHike: user.isAddedToHike
        };
      })
    };
  }

  async addUserToHike(body: { hikeId: number; userId: number }) {
    const isExists = await this.orderRepository.findOne({
      where: {
        hikingId: body.hikeId,
        userId: body.userId
      }
    });

    if (isExists) {
      return {
        success: false,
        result: null,
        message: "Пользователь уже добавлен в поход"
      };
    }

    await this.orderRepository.create({
      ...{
        hikingId: body.hikeId,
        userId: body.userId
      }
    });

    return {
      success: true,
      result: null
    };
  }

  async getUnCompletedHikesForUser(request: Request) {
    const decode = this.jwtService.decode(
      getToken(request.headers["authorization-user"] as string)
    );
    const userId = decode["userId"];

    const ordered = await this.orderRepository.findAll({
      where: {
        userId
      }
    });

    const hikings = await this.hikingRepository
      .findAll({
        where: {
          id: {
            [Op.in]: ordered.map((e) => e.hikingId)
          },
          endDate: {
            [Op.gte]: moment().format("YYYY-MM-DD")
          }
        },
        include: [Levels, HikeTypes, Companies, Currencies]
      })
      .then((hikes) => {
        hikes.forEach((hike) => {
          hike.dataValues["countPeople"] = ordered.filter(
            (e) => e.hikingId === hike.id
          ).length;
        });

        return hikes;
      });

    return {
      success: true,
      result: hikings.map((hike) => {
        return {
          ...hike.dataValues,
          ...{
            images: hike.images.map((image) => {
              return "/images/" + image;
            })
          }
        };
      })
    };
  }

  async getPopulars() {
    const hikings = await this.hikingRepository.findAll({
      where: {
        startDate: {
          [Op.gte]: moment().format("YYYY-MM-DD")
        }
      },
      include: [Levels, HikeTypes, Companies, Currencies]
    });

    const orders = await this.orderRepository.findAll({
      where: {
        hikingId: {
          [Op.in]: hikings.map((hike) => hike.id)
        }
      },
      attributes: ["hikingId", [fn("COUNT", col("hikingId")), "count"]],
      group: ["hikingId"],
      order: [[literal("count"), "DESC"]],
      limit: 3
    });

    return {
      success: true,
      result: hikings
        .filter((hike) => orders.some((order) => order.hikingId === hike.id))
        .map((hike) => {
          return {
            ...hike.dataValues,
            ...{
              images: hike.images.map((image) => {
                return "/images/" + image;
              })
            },
            ...{
              countPeople: Number(
                orders.find((order) => order.hikingId === hike.id).dataValues
                  .count
              )
            }
          };
        })
    };
  }

  async getNearest() {
    const nearest = await this.hikingRepository.findAll({
      where: {
        startDate: {
          [Op.gte]: moment().format("YYYY-MM-DD")
        }
      },
      order: [["startDate", "ASC"]],
      include: [Levels, HikeTypes, Companies, Currencies],
      limit: 10
    });

    return {
      success: true,
      result: nearest.map((hike) => {
        return {
          ...hike.dataValues,
          ...{
            images: hike.images.map((image) => {
              return "/images/" + image;
            })
          }
        };
      })
    };
  }
}
