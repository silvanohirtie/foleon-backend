import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { PagesService } from '../pages/pages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/typeorm/entities/Image';
import { Page } from 'src/typeorm/entities/Page';
@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    TypeOrmModule.forFeature([Page]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, PagesService],
})
export class ImagesModule {}
