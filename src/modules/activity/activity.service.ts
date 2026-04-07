import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateActivityDto) {
        if (!dto.title || !dto.description) {
            throw new Error('Title and description are required');
        }

        return this.prisma.activity.create({
            data: {
                title: dto.title,
                description: dto.description,
                image: dto.image,
                date: new Date(),
            },
        });
    }

    findAll() {
        return this.prisma.activity.findMany({
        orderBy: { date: 'desc' },
        });
    }

    async findOne(id: number) {
        const activity = await this.prisma.activity.findUnique({
            where: { id },
        });

        if (!activity) {
            throw new NotFoundException('Activity not found');
        }

        return activity;
    }

    update(id: number, dto: UpdateActivityDto) {
        const data: any = {};

        if (dto.title) data.title = dto.title;
        if (dto.description) data.description = dto.description;
        if (dto.image) data.image = dto.image;
        if (dto.date) data.date = new Date(dto.date);

        return this.prisma.activity.update({
            where: { id },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.activity.delete({
        where: { id },
        });
    }
}