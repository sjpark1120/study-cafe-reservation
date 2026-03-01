import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import type { PaginationQuery } from '../types/pagination.types';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

const toPositiveInt = (value: unknown, max?: number) => {
  const num = Number(value);
  if (!Number.isInteger(num) || num < 1) return DEFAULT_PAGE;
  if (max !== undefined && num > max) return max;
  return num;
};

export class PaginationQueryDto implements PaginationQuery {
  @IsOptional()
  @Transform(({ value }) => toPositiveInt(value))
  @IsInt()
  @Min(1)
  page: number = DEFAULT_PAGE;

  @IsOptional()
  @Transform(({ value }) => toPositiveInt(value))
  @IsInt()
  @Min(1)
  @Max(MAX_PAGE_SIZE)
  limit: number = DEFAULT_PAGE_SIZE;
}
