'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, MapPin, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCafeDetail } from '@/lib/hooks/useCafeDetail';

import { Link } from '@i18n/navigation';
import { Button } from '@/components/ui/button';
import { TagBadge } from '@/components/TagBadge';
import CafeDetailSkeleton from './_components/CafeDetailSkeleton';

const getDummySeatInfo = ({ id }: { id: number }) => {
    const baseTotalSeats = 18 + (id % 14);
    const maxAvailableSeats = baseTotalSeats - 4;
    const availableSeats = 4 + ((id * 7) % maxAvailableSeats);

    return {
        availableSeats,
        totalSeats: baseTotalSeats,
    };
};

interface BackToCafeListLinkProps {
    label: string;
}

const BackToCafeListLink = ({ label }: BackToCafeListLinkProps) => {
    return (
        <Link
            href="/cafe"
            className="text-muted-foreground inline-flex items-center gap-1 text-xs sm:text-sm"
        >
            <ArrowLeft className="size-4" />
            <span>{label}</span>
        </Link>
    );
};

const CafeDetailPage = () => {
    const params = useParams();
    const idParam = params?.id;
    const idAsString = Array.isArray(idParam) ? idParam[0] : idParam;
    const cafeId = Number(idAsString);

    const t = useTranslations('cafe');

    const isValidId = !!idAsString && !Number.isNaN(cafeId);

    const { data, isLoading, isError } = useCafeDetail(cafeId, {
        enabled: isValidId,
    });

    if (!isValidId) {
        return (
            <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pt-6 pb-12 sm:pt-8">
                <BackToCafeListLink label={t('backToCafeList')} />
                <div className="border-destructive/40 bg-destructive/5 text-destructive flex h-40 items-center justify-center rounded-xl border border-dashed text-sm">
                    {t('invalidCafeInfo')}
                </div>
            </main>
        );
    }

    if (isLoading) return <CafeDetailSkeleton />;

    if (isError || !data) {
        return (
            <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pt-6 pb-12 sm:pt-8">
                <BackToCafeListLink label={t('backToCafeList')} />
                <div className="border-destructive/40 bg-destructive/5 text-destructive flex h-40 items-center justify-center rounded-xl border border-dashed text-sm">
                    {t('errorLoadingCafeInfo')}
                </div>
            </main>
        );
    }

    const fullAddress = `${data.roadAddress} ${data.detailAddress}`.trim();
    const imageUrl = process.env.NEXT_PUBLIC_API_URL! + data.imageUrl;

    const hasPrice = data.priceValue != null;
    const hasHashTags = data.hashTags?.length > 0;
    const { availableSeats, totalSeats } = getDummySeatInfo({ id: data.id });

    return (
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-6 pb-12 sm:pt-8">
            <BackToCafeListLink label={t('backToCafeList')} />

            <section className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
                <section className="bg-muted relative aspect-video w-full overflow-hidden rounded-2xl lg:flex-3">
                    {data.imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={data.businessName}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 640px, (min-width: 640px) 60vw, 100vw"
                        />
                    ) : (
                        <div className="from-muted to-muted/60 text-muted-foreground flex h-full items-center justify-center bg-linear-to-br text-sm">
                            {t('imagePreparing')}
                        </div>
                    )}
                </section>

                <aside className="border-border bg-card flex w-full max-w-sm flex-col justify-between gap-4 rounded-2xl border p-5 shadow-sm lg:flex-1">
                    <div className="space-y-4">
                        <div>
                            <p className="text-muted-foreground text-xs font-medium">
                                {t('cafeInfo')}
                            </p>
                            <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                                {data.businessName}
                            </h1>
                            <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs sm:text-sm">
                                <MapPin className="size-4" />
                                {fullAddress}
                            </p>
                        </div>

                        <div className="space-y-3 border-y py-3 text-sm">
                            <div className="flex items-center justify-between">
                                <div className="text-muted-foreground flex items-center gap-2">
                                    <Clock className="size-4" />
                                    <span>{t('price Info')}</span>
                                </div>
                                <span className="font-semibold">
                                    {hasPrice
                                        ? t('price', {
                                              price: data.priceValue ?? 0,
                                          })
                                        : t('pricePreparing')}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-muted-foreground flex items-center gap-2">
                                    <Users className="size-4" />
                                    <span>
                                        {t('available')} {t('seats')}
                                    </span>
                                </div>
                                <span className="font-semibold">
                                    {availableSeats} / {totalSeats} {t('seats')}
                                </span>
                            </div>
                        </div>

                        {hasHashTags && (
                            <div className="space-y-2">
                                <p className="text-muted-foreground text-xs font-medium">
                                    {t('convenienceFacilities')}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {data.hashTags.map((tag) => (
                                        <TagBadge key={tag} label={tag} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <Button
                        className="mt-2 h-11 rounded-full text-sm font-medium"
                        disabled
                    >
                        {t('selectSeat')}
                    </Button>
                </aside>
            </section>
        </main>
    );
};

export default CafeDetailPage;
