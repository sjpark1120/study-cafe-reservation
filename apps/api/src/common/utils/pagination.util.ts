import type { PaginatedResponse } from '../types/pagination.types';

export const getSkipTake = (
  page: number,
  limit: number,
): { skip: number; take: number } => {
  const skip = (page - 1) * limit;
  const take = limit;
  return { skip, take };
};

export const buildPaginatedResponse = <T>(params: {
  rows: T[];
  totalCount: number;
  page: number;
  limit: number;
}): PaginatedResponse<T> => {
  const { rows, totalCount, page, limit } = params;
  const totalPages = limit > 0 ? Math.ceil(totalCount / limit) : 0;
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    totalCount,
    page,
    limit,
    totalPages,
    hasNext,
    hasPrev,
    rows,
  };
};
