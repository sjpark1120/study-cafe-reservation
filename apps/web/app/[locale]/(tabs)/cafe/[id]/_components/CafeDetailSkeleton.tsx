const CafeDetailSkeleton = () => {
    return (
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-6 pb-12 sm:pt-8">
            <div className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                <div className="bg-muted-foreground/20 h-4 w-4 rounded-full" />
                <div className="bg-muted-foreground/20 h-4 w-32 rounded" />
            </div>

            <section className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
                <div className="bg-muted-foreground/20 aspect-video w-full rounded-2xl lg:flex-3" />

                <div className="border-border bg-card flex w-full max-w-sm animate-pulse flex-col gap-4 rounded-2xl border p-5 shadow-sm lg:flex-1">
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <div className="bg-muted-foreground/20 h-3 w-16 rounded" />
                            <div className="bg-muted-foreground/20 h-5 w-40 rounded" />
                            <div className="bg-muted-foreground/20 h-3 w-48 rounded" />
                        </div>

                        <div className="space-y-3 border-y py-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="bg-muted-foreground/20 h-4 w-4 rounded-full" />
                                    <div className="bg-muted-foreground/20 h-3 w-12 rounded" />
                                </div>
                                <div className="bg-muted-foreground/20 h-4 w-20 rounded" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="bg-muted-foreground/20 h-4 w-4 rounded-full" />
                                    <div className="bg-muted-foreground/20 h-3 w-16 rounded" />
                                </div>
                                <div className="bg-muted-foreground/20 h-4 w-24 rounded" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="bg-muted-foreground/20 h-3 w-14 rounded" />
                            <div className="flex flex-wrap gap-1.5">
                                <div className="bg-muted-foreground/20 h-7 w-14 rounded-full" />
                                <div className="bg-muted-foreground/20 h-7 w-16 rounded-full" />
                                <div className="bg-muted-foreground/20 h-7 w-12 rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <div className="bg-muted-foreground/20 h-11 w-full rounded-full" />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CafeDetailSkeleton;
