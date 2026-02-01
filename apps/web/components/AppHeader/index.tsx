'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { MdStore, MdBarChart, MdPerson } from 'react-icons/md';

const LOGO_SRC = '/logo.svg';

const tabs = [
    { label: 'Cafe ', href: '/cafe', icon: MdStore },
    { label: 'Statistics', href: '/statistics', icon: MdBarChart },
    { label: 'My Page', href: '/my-page', icon: MdPerson },
] as const;

const AppHeader = () => {
    const pathname = usePathname();
    const router = useRouter();

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
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;
