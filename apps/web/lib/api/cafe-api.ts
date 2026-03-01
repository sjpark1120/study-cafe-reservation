import { request } from '@api/client';

export function getCafes({
    page,
    limit,
}: {
    page: number;
    limit: number;
}): Promise<CafePaginatedResponse> {
    const searchParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    return request.get<CafePaginatedResponse>(
        `/cafes?${searchParams.toString()}`
    );
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

export interface CafePaginatedResponse {
    rows: CafeListItemResponse[];
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
