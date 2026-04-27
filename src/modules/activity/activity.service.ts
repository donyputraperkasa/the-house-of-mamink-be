import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateActivityDto) {
        // debug log to see incoming data
        console.log('CREATE ACTIVITY DTO:', dto);

        if (!dto || !dto.title || !dto.description) {
            throw new BadRequestException('Title and description are required');
        }

        return this.prisma.activity.create({
            data: {
                title: dto.title,
                description: dto.description,
                image: dto.image ?? '', // prevent null error
                date: dto.date ? new Date(dto.date) : new Date(),
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

    async update(id: number, dto: UpdateActivityDto) {
        console.log('UPDATE ACTIVITY DTO:', dto); // 🔍 debug

        const existing = await this.prisma.activity.findUnique({
            where: { id },
        });

        if (!existing) {
            throw new NotFoundException('Activity not found');
        }

        const data: any = {};

        if (dto.title !== undefined) data.title = dto.title;
        if (dto.description !== undefined) data.description = dto.description;
        if (dto.date !== undefined && dto.date !== null && dto.date !== '') {
            data.date = new Date(dto.date as any);
        }
        if (dto.image !== undefined) data.image = dto.image;

        console.log('FINAL UPDATE DATA:', data);

        const updated = await this.prisma.activity.update({
            where: { id },
            data,
        });

        console.log('UPDATED RESULT:', updated);

        return updated;
    }

    remove(id: number) {
        return this.prisma.activity.delete({
        where: { id },
        });
    }
}