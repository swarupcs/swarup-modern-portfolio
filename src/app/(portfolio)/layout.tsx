'use client';

import { PortfolioProvider } from '@/lib/portfolio-context';
import { TerminalProvider } from '@/components/terminal-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SplashScreen from '@/components/splash-screen';
import { CommandPalette } from '@/components/command-palette';
import { TerminalOverlay } from '@/components/terminal-overlay';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioProvider>
      <TerminalProvider>
        <SplashScreen />
        <Header />
        <main className='pt-20'>{children}</main>
        <Footer />
        <CommandPalette />
        <TerminalOverlay />
      </TerminalProvider>
    </PortfolioProvider>
  );
}
