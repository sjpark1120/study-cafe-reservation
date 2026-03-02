import { useInfiniteQuery } from '@tanstack/react-query';
import { getCafes, type CafeListItemResponse } from '@api/cafeApi';

export interface CafeWithSeatInfo extends CafeListItemResponse {
    dummyAvailableSeats: number;
    dummyTotalSeats: number;
}

export const CAFE_PAGE_SIZE = 6;

const getDummySeatInfo = ({ id }: { id: number }) => {
    const baseTotalSeats = 18 + (id % 14);
    const maxAvailableSeats = baseTotalSeats - 4;
    const availableSeats = 4 + ((id * 7) % maxAvailableSeats);

    return {
        availableSeats,
        totalSeats: baseTotalSeats,
    };
};

const mapToCafeWithSeatInfo = (
    rows: CafeListItemResponse[]
): CafeWithSeatInfo[] =>
    rows.map((cafe) => {
        const { availableSeats, totalSeats } = getDummySeatInfo({
            id: cafe.id,
        });
        return {
            ...cafe,
            dummyAvailableSeats: availableSeats,
            dummyTotalSeats: totalSeats,
        };
    });

interface UseCafesInfiniteOptions {
    search?: string;
}

export const useCafesInfinite = (options: UseCafesInfiniteOptions = {}) => {
    const { search } = options;

    return useInfiniteQuery({
        queryKey: ['cafes', search ?? ''],
        queryFn: async ({ pageParam }) => {
            const response = await getCafes({
                page: pageParam,
                limit: CAFE_PAGE_SIZE,
                search: search?.trim() || undefined,
            });
            return {
                ...response,
                rows: mapToCafeWithSeatInfo(response.rows),
            };
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.hasNext ? lastPage.page + 1 : undefined,
    });
};
