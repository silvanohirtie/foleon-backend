import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { CreateImageDto, UpdateImageDto } from "./images.dto";
import { ImagesService } from "./images.service";

@Controller("images")
export class ImagesController {
  constructor(private imagesService: ImagesService) {}
  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(":id")
  findById(@Param("id", ParseIntPipe) id: number) {
    return this.imagesService.findById(id);
  }

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Put(":id")
  updateById(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateImageDto: UpdateImageDto
  ) {
    if (!(updateImageDto.name && updateImageDto.url))
      throw new HttpException(
        {
          error_message: `unvalid payload`,
        },
        HttpStatus.BAD_REQUEST
      );
    return this.imagesService.updateById(id, updateImageDto);
  }

  @Delete(":id")
  deleteById(@Param("id", ParseIntPipe) id: number) {
    return this.imagesService.deleteById(id);
  }
}
