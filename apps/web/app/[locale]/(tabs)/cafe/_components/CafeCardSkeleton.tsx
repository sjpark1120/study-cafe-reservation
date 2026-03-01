const CafeCardSkeleton = () => {
    return (
        <div className="border-border bg-card flex h-full animate-pulse flex-col overflow-hidden rounded-2xl border">
            <div className="relative h-48 w-full sm:h-56">
                <div className="bg-muted-foreground/20 h-full w-full" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3 sm:p-4">
                    <div className="bg-muted-foreground/25 h-4 w-2/3 rounded" />
                    <div className="bg-muted-foreground/25 h-3 w-1/2 rounded" />
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="bg-muted-foreground/20 h-4 w-24 rounded" />
                        <div className="bg-muted-foreground/20 h-3 w-16 rounded" />
                    </div>
                    <div className="bg-muted-foreground/20 h-6 w-16 rounded-full" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                    <div className="bg-muted-foreground/20 h-7 w-14 rounded-full" />
                    <div className="bg-muted-foreground/20 h-7 w-16 rounded-full" />
                    <div className="bg-muted-foreground/20 h-7 w-10 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default CafeCardSkeleton;
