import AdminPageClient from '@/components/admin/admin-page-client';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Admin Panel | Portfolio',
  description: 'Manage your portfolio content',
};

export default function AdminPage() {
  return <AdminPageClient />;
}
