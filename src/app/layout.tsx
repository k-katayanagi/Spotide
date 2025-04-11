import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/authOptions';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ResponsiveHeader from '@/components/responsive/header/ResponsiveHeader';
import ResponsiveFooter from '@/components/responsive/footer/ResponsiveFooter';
import { Providers } from './providers';
import { ListProvider } from '@/contexts/ListContext';
import { ListItemProvider } from '@/contexts/ListItemContext';
import { SearchSpotProvider } from '@/contexts/SearchSpotContext';
import AuthGuard from '@/components/auth/AuthGuard';
import '@/app/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Spotide',
  description: '集める、シェアする、決める。すべてSpotide',
  icons: {
    icon: '/images/logo.jpg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ListProvider>
          <ListItemProvider>
            <SearchSpotProvider>
              <Providers session={session}>
                <ResponsiveHeader />
                <AuthGuard>
                  <main>{children}</main>
                </AuthGuard>
                <ResponsiveFooter />
              </Providers>
            </SearchSpotProvider>
          </ListItemProvider>
        </ListProvider>
      </body>
    </html>
  );
}
