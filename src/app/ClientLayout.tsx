'use client';

import type React from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { PortfolioProvider } from '@/lib/portfolio-context';
import { TerminalProvider } from '@/components/terminal-provider';
import { TerminalOverlay } from '@/components/terminal-overlay';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <PortfolioProvider>
        <TerminalProvider>
          <div className='relative min-h-screen'>
            <Header />
            <main className='pt-20'>{children}</main>
            <Footer />
            <TerminalOverlay />
          </div>
        </TerminalProvider>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
