import {
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  Min,
  MinLength,
  IsNotEmpty,
  MaxLength,
  Allow,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';

export class GetCafesQueryDto extends IntersectionType(PaginationQueryDto) {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() || undefined : undefined,
  )
  search?: string;
}

export interface CafeListItemResponse {
  id: number;
  businessName: string;
  roadAddress: string;
  detailAddress: string;
  hashTags: string[];
  imageUrl: string | null;
  priceValue: number | null;
}

export class CreateCafeDto {
  @IsString({ message: 'Business name is required' })
  @IsNotEmpty({ message: 'Business name is required' })
  @IsString({ message: 'Business name must be a string' })
  @MinLength(1, {
    message: 'Business name must be at least 1 character long',
  })
  @MaxLength(255, {
    message: 'Business name must be less than 255 characters long',
  })
  businessName: string;

  @IsString({ message: 'Road address is required' })
  @IsNotEmpty({ message: 'Road address is required' })
  @IsString({ message: 'Road address must be a string' })
  @MinLength(1, {
    message: 'Road address must be at least 1 character long',
  })
  @MaxLength(255, {
    message: 'Road address must be less than 255 characters long',
  })
  roadAddress: string;

  @IsString({ message: 'Detail address is required' })
  @IsNotEmpty({ message: 'Detail address is required' })
  @IsString({ message: 'Detail address must be a string' })
  @MinLength(1, {
    message: 'Detail address must be at least 1 character long',
  })
  @MaxLength(255, {
    message: 'Detail address must be less than 255 characters long',
  })
  detailAddress: string;

  @IsArray({ message: 'Hash tags must be an array' })
  @IsString({ each: true, message: 'Hash tags must be a string' })
  @IsOptional({ message: 'Hash tags are optional' })
  @Transform(({ value }): string[] => {
    if (Array.isArray(value)) return value as string[];
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean);
    }
    return [];
  })
  hashTags?: string[];

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Price must be 0 or greater' })
  @Transform(({ value }) =>
    value === '' || value === undefined || value === null
      ? undefined
      : Number(value),
  )
  priceValue?: number;

  @IsOptional()
  @Allow()
  image?: unknown;
}
