import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';

import type { Metadata } from 'next';
import { pretendard } from '../fonts';
import '../globals.css';
import { Providers } from '../providers';
import { routing } from '@i18n/routing';

import AppHeader from '@components/AppHeader';
import AuthModal from '@components/AuthModal';

interface Props {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
    title: 'Study Spot',
    description: 'Study cafe reservation site',
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${pretendard.variable} antialiased`}>
                <Providers>
                    <NextIntlClientProvider messages={messages}>
                        <AppHeader />
                        <div className="mx-auto max-w-5xl">{children}</div>
                        <AuthModal />
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}
