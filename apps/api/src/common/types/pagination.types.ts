export interface PaginationQuery {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  rows: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
