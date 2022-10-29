import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '../typeorm/entities/Page';
import { CreatePageDto, UpdatePageDto } from './pages.dto';
@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page) private pageRepository: Repository<Page>,
  ) {}
  findAll() {
    return this.pageRepository.find({});
  }
  async findById(id: number) {
    const page = await this.pageRepository.findOneBy({ id });
    if (!page)
      throw new HttpException(
        { error_message: `Page was not found` },
        HttpStatus.NOT_FOUND,
      );
    return page;
  }

  findByImageId(id: number) {
    return this.pageRepository.findOneBy({ image_id: id });
  }

  create(pagePayload: CreatePageDto) {
    const newPage = this.pageRepository.create({
      ...pagePayload,
      created_at: new Date().toISOString(),
    });
    return this.pageRepository.save(newPage);
  }
  updateById(id: number, pagePayload: UpdatePageDto) {
    return this.pageRepository.update({ id }, { ...pagePayload });
  }
  deleteById(id: number) {
    return this.pageRepository.delete({ id });
  }
}
