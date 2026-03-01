import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import type { CafeWithSeatInfo } from '@/lib/hooks/useCafesInfinite';

interface CafeCardProps {
    cafe: CafeWithSeatInfo;
}

const CafeCard = ({ cafe }: CafeCardProps) => {
    const t = useTranslations('cafe');
    const { dummyAvailableSeats, dummyTotalSeats } = cafe;

    const fullAddress = `${cafe.roadAddress} ${cafe.detailAddress}`;

    const hasPrice = cafe.priceValue != null;
    const hasHashTags = cafe.hashTags?.length > 0;

    const imageUrl = process.env.NEXT_PUBLIC_API_URL! + cafe.imageUrl;

    return (
        <article className="border-border bg-card flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-transform duration-150 hover:-translate-y-1 hover:shadow-md">
            <div className="bg-muted relative h-48 w-full overflow-hidden sm:h-56">
                {cafe.imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={cafe.businessName}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
                    />
                ) : (
                    <div className="from-muted to-muted/60 text-muted-foreground flex h-full items-center justify-center bg-linear-to-br text-sm">
                        {t('imagePreparing')}
                    </div>
                )}
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end gap-0.5 bg-linear-to-t from-black/60 via-black/30 to-transparent p-3 sm:p-4">
                    <h2 className="line-clamp-1 text-base font-bold text-white drop-shadow-sm sm:text-lg">
                        {cafe.businessName}
                    </h2>
                    <p className="line-clamp-1 flex items-center gap-1 text-xs text-white/90 drop-shadow-sm sm:text-sm">
                        <MapPin className="size-4 text-white/90" />
                        {fullAddress}
                    </p>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="space-y-0.5">
                        <p className="font-medium text-emerald-600 dark:text-emerald-400">
                            {t('availableSeats', {
                                availableSeats: dummyAvailableSeats,
                            })}
                        </p>
                        <p className="text-muted-foreground text-[11px] sm:text-xs">
                            {t('totalSeats', { totalSeats: dummyTotalSeats })}
                        </p>
                    </div>

                    {hasPrice ? (
                        <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-[11px] font-medium sm:text-xs">
                            {t('price', {
                                price: cafe.priceValue ?? 0,
                            })}
                        </div>
                    ) : (
                        <div className="bg-muted-foreground/5 text-muted-foreground rounded-full px-3 py-1 text-[11px] sm:text-xs">
                            {t('pricePreparing')}
                        </div>
                    )}
                </div>

                {hasHashTags && (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                        {cafe.hashTags.map((tag) => (
                            <Button
                                key={tag}
                                type="button"
                                variant="outline"
                                size="sm"
                                className="border-border bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground h-7 rounded-full px-3 text-xs font-normal"
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};

export default CafeCard;
