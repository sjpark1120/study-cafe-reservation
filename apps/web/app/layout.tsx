import type { Metadata } from 'next';
import { pretendard } from './fonts';
import './globals.css';

import AppHeader from '@/components/AppHeader';

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
                <AppHeader />
                {children}
            </body>
        </html>
    );
}
