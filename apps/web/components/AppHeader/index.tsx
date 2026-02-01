'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MdStore, MdBarChart, MdPerson } from 'react-icons/md';
import {
    useAuthModalStore,
    type AuthModalStore,
} from '@lib/stores/auth-modal-store';
import LocaleButton from './components/LocaleButton';

const LOGO_SRC = '/logo.svg';

const tabs = [
    { key: 'cafe', href: '/cafe', icon: MdStore },
    { key: 'statistics', href: '/statistics', icon: MdBarChart },
    { key: 'myPage', href: '/my-page', icon: MdPerson },
] as const;

const AppHeader = () => {
    const t = useTranslations('header');
    const pathname = usePathname();
    const router = useRouter();

    const openLogin = useAuthModalStore((s: AuthModalStore) => s.openLogin);

    const handleLogoClick = () => {
        router.push('/');
    };

    const handleTabClick = (href: string) => {
        router.push(href);
    };

    return (
        <header className="border-outline w-full border-b bg-white">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between">
                <Image
                    src={LOGO_SRC}
                    alt="logo"
                    width={820}
                    height={160}
                    className="h-8 w-auto cursor-pointer"
                    onClick={handleLogoClick}
                />
                <nav className="flex items-center gap-2">
                    {tabs.map((tab) => {
                        const isActive = pathname.startsWith(tab.href);
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.href}
                                onClick={() => handleTabClick(tab.href)}
                                data-active={isActive}
                                className={`flex items-center gap-2 rounded-md px-4 py-2 font-semibold ${
                                    isActive && 'bg-primary text-white'
                                }`}
                            >
                                <Icon className="size-5" />
                                {t(tab.key)}
                            </button>
                        );
                    })}
                    <LocaleButton />
                            <button
                                key={loc}
                                type="button"
                                onClick={() => setLocale(loc as Locale)}
                                className={`cursor-pointer rounded-md px-2 py-1 text-sm font-medium ${
                                    locale === loc
                                        ? 'bg-outline text-foreground'
                                        : 'text-foreground/70 hover:text-foreground'
                                }`}
                            >
                                {loc}
                            </button>
                        ))}
                    </span>
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;
