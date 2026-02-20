'use client';

import { PortfolioProvider } from '@/lib/portfolio-context';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SplashScreen from '@/components/splash-screen';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioProvider>
      <SplashScreen />
      <Header />
      <main className='pt-20'>{children}</main>
      <Footer />
    </PortfolioProvider>
  );
}