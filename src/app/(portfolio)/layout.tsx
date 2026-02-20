import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { PortfolioProvider } from '@/lib/portfolio-context';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My Portfolio',
};

export default function PortfolioLayout({
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
        <div className='relative min-h-screen flex flex-col'>
          <Header />
          <main className='flex-1 pt-20'>{children}</main>
          <Footer />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
