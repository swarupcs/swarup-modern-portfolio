'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogPost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  url: string;
  publishedAt: string;
  coverImage?: {
    url: string;
  };
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/hashnode');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch blogs');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          throw new Error('Invalid response format from Hashnode API');
        }
      } catch (err) {
        console.error('[v0] Error fetching blogs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (error) {
    return (
      <div className='text-center py-12'>
        <p className='text-destructive'>{error}</p>
        <p className='text-sm text-muted-foreground mt-2'>
          Please add your Hashnode hostname in environment variables
        </p>
      </div>
    );
  }

  return (
    <div className='grid gap-6'>
      {loading ? (
        Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className='p-6'>
              <Skeleton className='h-6 w-3/4 mb-4' />
              <Skeleton className='h-4 w-full mb-2' />
              <Skeleton className='h-4 w-5/6' />
            </Card>
          ))
      ) : blogs.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>
            No blogs found. Configure your Hashnode account.
          </p>
        </div>
      ) : (
        blogs.map((blog, index) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/blog/${blog.slug}`}>
              <Card className='p-6 hover:shadow-lg transition-shadow cursor-pointer h-full'>
                <div className='flex gap-4'>
                  {blog.coverImage?.url && (
                    <img
                      src={blog.coverImage.url || '/placeholder.svg'}
                      alt={blog.title}
                      className='w-24 h-24 rounded object-cover flex-shrink-0'
                    />
                  )}
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold mb-2 line-clamp-2'>
                      {blog.title}
                    </h3>
                    <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>
                      {blog.brief}
                    </p>
                    <div className='flex items-center justify-between text-xs text-muted-foreground'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-3 h-3' />
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </div>
                      <ArrowRight className='w-4 h-4' />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))
      )}
    </div>
  );
}
