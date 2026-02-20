'use client';

import { PortfolioProvider } from '@/lib/portfolio-context';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioProvider>
      <Header />
      <main className='pt-20'>{children}</main>
      <Footer />
    </PortfolioProvider>
  );
}
