import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Image } from "../typeorm/entities/Image";
import { Page } from "../typeorm/entities/Page";
import { CreateImageDto, UpdateImageDto } from "./images.dto";

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Page) private pageRepository: Repository<Page>,
    @InjectRepository(Image) private imageRepository: Repository<Image>
  ) {}
  findAll() {
    return this.imageRepository.find({});
  }

  async findById(id: number) {
    const image = await this.imageRepository.findOneBy({ id });
    if (!image)
      throw new HttpException(
        { error_message: `Image was not found` },
        HttpStatus.NOT_FOUND
      );
    return image;
  }

  create(imagePayload: CreateImageDto) {
    const newImage = this.imageRepository.create({
      ...imagePayload,
      created_at: new Date().toISOString(),
    });
    return this.imageRepository.save(newImage);
  }
  updateById(id: number, imagePayload: UpdateImageDto) {
    return this.imageRepository.update(+id, imagePayload);
  }
  async deleteById(id: number) {
    const pages = await this.pageRepository.findBy({ image_id: id });
    if (pages.length >= 1) {
      const pagesString = pages.map((page) => page.id).join(",");
      const pagesTitleString = pages
        .map((page) => page.title || "No title")
        .join(",");
      throw new HttpException(
        {
          error_message: `Image used by pages: ${pagesString} (${pagesTitleString})`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
    return this.imageRepository.delete({ id });
  }
}
