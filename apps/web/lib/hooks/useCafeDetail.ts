import { useQuery } from '@tanstack/react-query';
import { getCafeById } from '@api/cafeApi';

interface UseCafeDetailOptions {
    enabled?: boolean;
}

export const useCafeDetail = (id: number, options: UseCafeDetailOptions = {}) => {
    const { enabled = true } = options;

    return useQuery({
        queryKey: ['cafe', id],
        queryFn: () => getCafeById(id),
        enabled,
    });
};
