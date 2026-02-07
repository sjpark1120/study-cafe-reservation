'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeSync } from '@components/ThemeSync';

const CACHE_TIME = 60 * 1000;

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: CACHE_TIME,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeSync />
            {children}
        </QueryClientProvider>
    );
}
