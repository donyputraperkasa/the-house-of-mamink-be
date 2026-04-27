import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateGalleryDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    image?: string;
}