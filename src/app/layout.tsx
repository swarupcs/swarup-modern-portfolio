import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { PortfolioProvider } from '@/lib/portfolio-context';
import { SplashScreen } from '@/components/splash-screen';
import { CommandPalette } from '@/components/command-palette';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Swarup Das | Portfolio',
  description: 'Full-Stack Developer & Creative Problem Solver',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <PortfolioProvider>
            <SplashScreen />
            <CommandPalette />
            <Header />
            {children}
            <Footer />
          </PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
