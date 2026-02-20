import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Portfolio',
  description: 'Portfolio admin panel',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
