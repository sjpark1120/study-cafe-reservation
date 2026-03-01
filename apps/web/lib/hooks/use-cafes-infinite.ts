import { useInfiniteQuery } from '@tanstack/react-query';
import { getCafes, type CafeListItemResponse } from '@/lib/api/cafe-api';

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

export const useCafesInfinite = () => {
    return useInfiniteQuery({
        queryKey: ['cafes'],
        queryFn: async ({ pageParam }) => {
            const response = await getCafes({
                page: pageParam,
                limit: CAFE_PAGE_SIZE,
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
