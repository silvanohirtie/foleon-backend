import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateImageDto, UpdateImageDto } from './images.dto';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}
  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.findById(id);
  }

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Put(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    this.imagesService.updateById(id, updateImageDto);
  }

  @Delete(':id')
  async deleteImage(@Param('id', ParseIntPipe) id: number) {
    await this.imagesService.deleteById(id);
  }
}
