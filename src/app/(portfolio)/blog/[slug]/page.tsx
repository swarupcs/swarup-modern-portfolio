'use client';

import BlogDetail from '@/components/blog-detail';
import { useParams } from 'next/navigation';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className='min-h-screen pt-20 pb-20'>
      <BlogDetail slug={slug} />
    </div>
  );
}
