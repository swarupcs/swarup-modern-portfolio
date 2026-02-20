'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { PortfolioProvider } from '@/lib/portfolio-context';

export default function PortfolioShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioProvider>
      <div className='relative min-h-screen'>
        <Header />
        <main className='pt-20'>{children}</main>
        <Footer />
      </div>
    </PortfolioProvider>
  );
}
