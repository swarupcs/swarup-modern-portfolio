'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogPost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  url: string;
  publishedAt: string;
  tags?: { name: string }[];
  coverImage?: {
    url: string;
  };
}

export default function BlogList({ limit }: { limit?: number }) {
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
      <div className='text-center py-12 px-4 max-w-2xl mx-auto'>
        <p className='text-destructive text-sm md:text-base'>{error}</p>
        <p className='text-xs md:text-sm text-muted-foreground mt-2'>
          Please add your Hashnode hostname in environment variables
        </p>
      </div>
    );
  }

  const displayBlogs = limit ? blogs.slice(0, limit) : blogs;

  return (
    <div className='space-y-12 max-w-3xl mx-auto'>
      {loading ? (
        Array(limit || 3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className='space-y-3'>
              <Skeleton className='h-7 w-3/4 mx-auto' />
              <Skeleton className='h-5 w-full' />
              <Skeleton className='h-5 w-5/6 mx-auto' />
            </div>
          ))
      ) : displayBlogs.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>
            No blogs found. Configure your Hashnode account.
          </p>
        </div>
      ) : (
        displayBlogs.map((blog, index) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className='group'
          >
            <Link
              href={`/blog/${blog.slug}`}
              className='block space-y-4 p-6 rounded-xl border border-border hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/5 hover:via-transparent hover:to-secondary/5 transition-all duration-300 dark:border-white/10 dark:hover:border-primary/50 dark:hover:bg-gradient-to-br dark:hover:from-primary/10 dark:hover:to-secondary/5'
            >
              <div className='flex items-start justify-between gap-4'>
                <h3 className='text-xl md:text-2xl font-bold group-hover:text-primary transition-colors flex-1 text-balance'>
                  {blog.title}
                </h3>
                <ArrowUpRight className='w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0' />
              </div>

              <p className='text-base text-muted-foreground leading-relaxed text-pretty'>
                {blog.brief}
              </p>

              <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  <span>
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {blog.tags && blog.tags.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.name}
                        className='px-2 py-1 rounded-md bg-secondary/50 text-xs font-medium'
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))
      )}
    </div>
  );
}
