import { IsOptional, IsString } from 'class-validator';

export class UpdateActivityDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    date?: string;

    @IsOptional()
    @IsString()
    image?: string;
}