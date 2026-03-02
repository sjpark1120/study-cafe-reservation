'use client';

import { useEffect, useRef, useState } from 'react';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import CafeCardSkeleton from './_components/CafeCardSkeleton';
import CafeCard from './_components/CafeCard';

import { useTranslations } from 'next-intl';
import { useCafesInfinite, CAFE_PAGE_SIZE } from '@/lib/hooks/useCafesInfinite';
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';

const CafePage = () => {
    const t = useTranslations('cafe');
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const debouncedSearch = useDebouncedValue(searchInput);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useCafesInfinite({ search: debouncedSearch });

    const cafes = data?.pages.flatMap((page) => page.rows) ?? [];

    useEffect(() => {
        const element = loadMoreRef.current;
        if (!element || !hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (!entry?.isIntersecting) return;
                fetchNextPage();
            },
            {
                root: null,
                rootMargin: '200px 0px',
                threshold: 0.1,
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return (
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-6 pb-12 sm:pt-8">
            <section className="space-y-4">
                <div className="space-y-1">
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                        {t('findStudyCafe')}
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        {t('findStudyCafeDescription')}
                    </p>
                </div>

                <div className="border-input bg-background/60 flex w-full max-w-xl items-center gap-3 rounded-full border px-4 py-2 shadow-sm">
                    <Search className="text-muted-foreground size-4 shrink-0 sm:size-5" />
                    <Input
                        placeholder={t('searchPlaceholder')}
                        className="border-none bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </section>

            <section className="min-h-[320px]">
                {isError && !isLoading && !isFetchingNextPage && (
                    <div className="border-destructive/40 bg-destructive/5 text-destructive flex h-40 items-center justify-center rounded-xl border border-dashed text-sm">
                        {t('searchError')}
                    </div>
                )}

                {!isError && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
                        {isLoading
                            ? Array.from({ length: CAFE_PAGE_SIZE }).map(
                                  (_, index) => <CafeCardSkeleton key={index} />
                              )
                            : cafes.map((cafe) => (
                                  <CafeCard key={cafe.id} cafe={cafe} />
                              ))}

                        {isFetchingNextPage &&
                            Array.from({ length: 2 }).map((_, index) => (
                                <CafeCardSkeleton key={index} />
                            ))}
                    </div>
                )}

                <div ref={loadMoreRef} className="mt-4 h-6 w-full" />

                {!hasNextPage && !isLoading && (
                    <p className="text-muted-foreground mt-6 text-center text-xs sm:text-sm">
                        {t('noMoreCafes')}
                    </p>
                )}
            </section>
        </main>
    );
};

export default CafePage;
