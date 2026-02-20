import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Admin | Portfolio',
  description: 'Portfolio admin panel',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      forcedTheme='dark'
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
