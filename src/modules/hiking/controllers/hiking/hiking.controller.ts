import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { HikingsService } from "../../services/hiking/hiking.service";
import { CreateHikingDto } from "../../dto/create-hiking.dtos";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Request } from "express";

@ApiTags("Hikings")
@Controller("Hikings")
export class HikingsController {
  constructor(private service: HikingsService) {}

  @Get("List")
  getList() {
    return this.service.getList();
  }

  @Get("GetById")
  @ApiQuery({ name: "id", type: "number" })
  getById(@Query() query: { id: number }) {
    return this.service.getById(query.id);
  }

  @Post("Add")
  @UseInterceptors(FilesInterceptor("images"))
  add(
    @Body() hike: CreateHikingDto,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    return this.service.addHike(hike, images);
  }

  @Put("Edit")
  @UseInterceptors(FilesInterceptor("images"))
  edit(
    @Body() hike: CreateHikingDto,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    return this.service.editHike(hike, images);
  }

  @Get("GetUnCompleteHikes")
  // todo add it
  // @UseGuards(AuthCompaniesService)
  getUnCompleteHikes(@Req() req: Request) {
    return this.service.getUnCompleteHikes(req);
  }

  @Delete("Delete")
  @ApiQuery({ name: "id", type: "number" })
  deleteHike(@Query() query: { id: number }) {
    return this.service.deleteHike(query.id);
  }

  @Delete("DeleteImage")
  @ApiQuery({ name: "id", type: "number" })
  @ApiQuery({ name: "image", type: "string" })
  deleteImage(@Query() query: { id: number; image: string }) {
    return this.service.deleteImage(query.id, query.image);
  }

  @Get("GetHikesList")
  @ApiQuery({ name: "levelId", type: "number" })
  @ApiQuery({ name: "hikeTypeId", type: "number" })
  @ApiQuery({ name: "month", type: "number" })
  getHikesList(
    @Query() query: { levelId: number; hikeTypeId: number; month: number }
  ) {
    return this.service.getHikesList(query);
  }

  @Post("InterestUser")
  interestUser(@Req() req: Request, @Body() body: { id: number }) {
    return this.service.interestUser(req, body);
  }

  @Get("GetInterestUsersByHikeId")
  @ApiQuery({ name: "id", type: "number" })
  getInterestUsersByHikeId(@Query() query: { id: number }) {
    return this.service.getInterestUsersByHikeId(query.id);
  }
}
