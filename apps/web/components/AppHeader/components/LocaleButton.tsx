'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@i18n/navigation';

import { Button } from '@components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { ChevronDown, Globe } from 'lucide-react';

const LOCALE_LABELS = {
    ko: '한국어',
    en: 'English',
} as const;

function LocaleButton() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const handleLocaleChange = (locale: string) => {
        router.push({ pathname }, { locale });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="flex cursor-pointer items-center gap-2 font-semibold"
                >
                    <Globe className="size-5" />
                    <span>
                        {LOCALE_LABELS[locale as keyof typeof LOCALE_LABELS]}
                    </span>
                    <ChevronDown className="size-5 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-(--radix-dropdown-menu-trigger-width) min-w-(--radix-dropdown-menu-trigger-width)"
            >
                <DropdownMenuRadioGroup
                    value={locale}
                    onValueChange={handleLocaleChange}
                >
                    {Object.keys(LOCALE_LABELS).map((loc) => (
                        <DropdownMenuRadioItem
                            key={loc}
                            value={loc}
                            className="cursor-pointer"
                        >
                            {LOCALE_LABELS[loc as keyof typeof LOCALE_LABELS]}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default LocaleButton;
