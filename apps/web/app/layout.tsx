import type { Metadata } from 'next';
import { pretendard } from './fonts';
import './globals.css';
import { Providers } from './providers';

import AppHeader from '@components/AppHeader';

export const metadata: Metadata = {
    title: 'Study Spot',
    description: 'Study cafe reservation site',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={`${pretendard.variable} antialiased`}>
                <Providers>
                    <AppHeader />
                    <div className="mx-auto max-w-5xl">{children}</div>
                </Providers>
            </body>
        </html>
    );
}
