'use client';

import { useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginModal from '@components/auth/LoginModal';
import { ThemeSync } from '@components/ThemeSync';
import {
    useAuthModalStore,
    type AuthModalStore,
} from '@stores/auth-modal-store';
import { useLocaleStore } from '@stores/locale-store';
import en from '@/messages/en.json';
import ko from '@/messages/ko.json';

const CACHE_TIME = 60 * 1000;

const messages = { ko, en } as const;

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: CACHE_TIME,
                    },
                },
            })
    );

    const locale = useLocaleStore((s) => s.locale);
    const isLoginModalOpen = useAuthModalStore(
        (s: AuthModalStore) => s.isLoginModalOpen
    );
    const closeLogin = useAuthModalStore((s: AuthModalStore) => s.closeLogin);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeSync />
            <NextIntlClientProvider locale={locale} messages={messages[locale]}>
                {children}
                <LoginModal isOpen={isLoginModalOpen} onClose={closeLogin} />
            </NextIntlClientProvider>
        </QueryClientProvider>
    );
}
