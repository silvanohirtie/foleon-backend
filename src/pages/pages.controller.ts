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
import { CreatePageDto, UpdatePageDto } from './pages.dto';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private pagesService: PagesService) {}
  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.pagesService.findById(id);
  }

  @Post()
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    await this.pagesService.updateById(id, updatePageDto);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    await this.pagesService.deleteById(id);
  }
}
