import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { HikingsService } from "../../services/hiking/hiking.service";
import { CreateHikingDto } from "../../dto/create-hiking.dtos";
import { FilesInterceptor } from "@nestjs/platform-express";

@ApiTags("Hikings")
@Controller("Hikings")
export class HikingsController {
  constructor(private service: HikingsService) {}

  @Get("List")
  getList() {
    return this.service.getList();
  }

  @Get("ById")
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
}
