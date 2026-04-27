import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateGalleryDto) {
    console.log('CREATE GALLERY DTO:', dto);

    if (!dto || !dto.title) {
      throw new BadRequestException('Title is required');
    }

    return this.prisma.gallery.create({
      data: {
        title: dto.title,
        description: dto.description ?? '',
        image: dto.image ?? '',
      },
    });
  }

  findAll() {
    return this.prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const gallery = await this.prisma.gallery.findUnique({
      where: { id },
    });

    if (!gallery) {
      throw new NotFoundException('Gallery not found');
    }

    return gallery;
  }

  async update(id: number, dto: UpdateGalleryDto) {
    console.log('UPDATE GALLERY DTO:', dto);

    const existing = await this.prisma.gallery.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Gallery not found');
    }

    const data: any = {};

    if (dto.title !== undefined) data.title = dto.title;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.image !== undefined) data.image = dto.image;

    console.log('FINAL UPDATE DATA:', data);

    const updated = await this.prisma.gallery.update({
      where: { id },
      data,
    });

    console.log('UPDATED RESULT:', updated);

    return updated;
  }

  remove(id: number) {
    return this.prisma.gallery.delete({
      where: { id },
    });
  }
}
