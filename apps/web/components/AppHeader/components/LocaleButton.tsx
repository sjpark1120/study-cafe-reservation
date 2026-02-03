'use client';

import { ChevronDown, Globe } from 'lucide-react'

import {
    useLocaleStore,
    type Locale,
    type LocaleStore,
    LOCALES,
    LOCALE_LABELS,
} from '@lib/stores/locale-store';
import { Button } from '@components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

function LocaleButton() {
    const locale = useLocaleStore((s: LocaleStore) => s.locale);
    const setLocale = useLocaleStore((s: LocaleStore) => s.setLocale);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="flex cursor-pointer items-center gap-2 font-semibold"
                >
                    <Globe className="size-5" />
                    <span>{LOCALE_LABELS[locale]}</span>
                    <ChevronDown className="size-5 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-(--radix-dropdown-menu-trigger-width) min-w-(--radix-dropdown-menu-trigger-width)"
            >
                <DropdownMenuRadioGroup
                    value={locale}
                    onValueChange={(v) => setLocale(v as Locale)}
                >
                    {LOCALES.map((loc) => (
                        <DropdownMenuRadioItem
                            key={loc}
                            value={loc}
                            className="cursor-pointer"
                        >
                            {LOCALE_LABELS[loc as Locale]}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default LocaleButton;
