'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@i18n/navigation';

import { MdStore, MdBarChart, MdPerson } from 'react-icons/md';

import LocaleButton from './components/LocaleButton';
import ThemeButton from './components/ThemeButton';
import { Button } from '@components/ui/button';
import AuthMenuButton from './components/AuthMenuButton';

const LOGO_SRC = '/logo.svg';

const tabs = [
    { key: 'cafe', href: '/cafe', icon: MdStore },
    { key: 'statistics', href: '/statistics', icon: MdBarChart },
    { key: 'myPage', href: '/my-page', icon: MdPerson },
] as const;

const AppHeader = () => {
    const t = useTranslations('header');
    const pathname = usePathname();

    return (
        <header className="border-border bg-background w-full border-b">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between">
                <Link href="/">
                    <Image
                        src={LOGO_SRC}
                        alt="logo"
                        width={820}
                        height={160}
                        className="h-8 w-auto cursor-pointer"
                    />
                </Link>
                <nav className="flex items-center gap-2">
                    {tabs.map((tab) => {
                        const isActive =
                            pathname === tab.href ||
                            pathname.startsWith(`${tab.href}/`);
                        const Icon = tab.icon;

                        return (
                            <Link key={tab.href} href={tab.href}>
                                <Button
                                    variant={isActive ? 'default' : 'ghost'}
                                    className="flex cursor-pointer items-center gap-2 font-semibold"
                                >
                                    <Icon className="size-5" />
                                    {t(tab.key)}
                                </Button>
                            </Link>
                        );
                    })}
                    <ThemeButton />
                    <LocaleButton />
                    <AuthMenuButton />
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;
