'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  coverImage?: {
    url: string;
  };
  content: {
    markdown: string;
  };
  publishedAt: string;
  brief: string;
  author: {
    name: string;
    profilePicture?: string;
  };
  tags?: Array<{
    name: string;
    slug: string;
  }>;
}

export default function BlogDetail({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogList() {
      try {
        const listResponse = await fetch('/api/hashnode');
        if (!listResponse.ok) throw new Error('Failed to fetch blogs');
        const blogs: BlogPost[] = await listResponse.json();

        // Find blog by slug
        const targetBlog = blogs.find((b) => b.slug === slug);
        if (!targetBlog) throw new Error('Blog not found');

        const detailResponse = await fetch(
          `/api/hashnode?action=detail&id=${targetBlog.id}`
        );
        if (!detailResponse.ok) throw new Error('Failed to fetch blog details');
        const data = await detailResponse.json();
        setBlog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogList();
  }, [slug]);

  if (loading) {
    return (
      <div className='container px-4 md:px-6 max-w-3xl mx-auto py-12'>
        <Skeleton className='h-12 w-24 mb-8' />
        <Skeleton className='h-96 w-full mb-8 rounded-lg' />
        <Skeleton className='h-10 w-3/4 mb-4' />
        <Skeleton className='h-4 w-full mb-2' />
        <Skeleton className='h-4 w-full mb-2' />
        <Skeleton className='h-4 w-3/4' />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className='container px-4 md:px-6 max-w-3xl mx-auto py-12 text-center'>
        <p className='text-destructive text-lg'>{error || 'Blog not found'}</p>
        <Link href='/blog' className='mt-4 inline-block'>
          <Button variant='outline'>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  const wordCount = blog.content.markdown.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='container px-4 md:px-6 max-w-3xl mx-auto'
    >
      {/* Back Button */}
      <Link href='/blog'>
        <Button variant='ghost' size='sm' className='mb-8 -ml-2'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Blog
        </Button>
      </Link>

      {/* Cover Image */}
      {blog.coverImage?.url && (
        <div className='relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8'>
          <img
            src={blog.coverImage.url || '/placeholder.svg'}
            alt={blog.title}
            className='w-full h-full object-cover'
          />
        </div>
      )}

      {/* Article Header */}
      <header className='mb-8'>
        <h1 className='text-4xl md:text-5xl font-bold leading-tight mb-4 text-balance'>
          {blog.title}
        </h1>
        <p className='text-lg text-muted-foreground mb-6 leading-relaxed'>
          {blog.brief}
        </p>

        {/* Meta Information */}
        <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-6'>
          {blog.author.profilePicture && (
            <img
              src={blog.author.profilePicture || '/placeholder.svg'}
              alt={blog.author.name}
              className='w-10 h-10 rounded-full'
            />
          )}
          <div className='flex items-center gap-1'>
            <User className='w-4 h-4' />
            <span className='font-medium text-foreground'>
              {blog.author.name}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <Calendar className='w-4 h-4' />
            <span>
              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <Clock className='w-4 h-4' />
            <span>{readTime} min read</span>
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-6'>
            {blog.tags.map((tag) => (
              <span
                key={tag.slug}
                className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium'
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className='prose prose-lg dark:prose-invert max-w-none leading-relaxed'>
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className='text-3xl md:text-4xl font-bold mt-8 mb-4 text-balance'
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className='text-2xl md:text-3xl font-bold mt-8 mb-4 text-balance'
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3 className='text-xl font-bold mt-6 mb-3' {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4 className='text-lg font-bold mt-4 mb-2' {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className='mb-6 leading-relaxed text-lg' {...props} />
            ),
            a: ({ node, ...props }) => (
              <a
                className='text-primary hover:underline font-medium'
                {...props}
              />
            ),
            pre: ({ ...props }) => (
              <pre
                className='bg-muted rounded-lg overflow-x-auto p-4 mb-6 border border-border [&>code]:bg-transparent [&>code]:p-0'
                {...props}
              />
            ),
            code: ({ ...props }) => (
              <code
                className='bg-muted px-2.5 py-1 rounded text-sm font-mono text-primary'
                {...props}
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className='border-l-4 border-primary pl-6 py-2 italic my-6 bg-muted/50 py-4 px-4 rounded'
                {...props}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul className='list-disc pl-6 mb-6 space-y-2' {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className='list-decimal pl-6 mb-6 space-y-2' {...props} />
            ),
            li: ({ node, ...props }) => <li className='mb-2' {...props} />,
            img: ({ node, ...props }) => (
              <img
                className='w-full rounded-lg my-8 shadow-lg border border-border'
                {...props}
                alt='article-image'
                loading='lazy'
              />
            ),
            table: ({ node, ...props }) => (
              <div className='overflow-x-auto my-6 border border-border rounded-lg'>
                <table className='w-full text-sm' {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className='bg-muted border-b border-border' {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className='px-4 py-2 text-left font-semibold' {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className='px-4 py-2 border-b border-border' {...props} />
            ),
            hr: ({ node, ...props }) => (
              <hr className='my-8 border-border' {...props} />
            ),
          }}
        >
          {blog.content.markdown}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <div className='border-t border-border mt-12 pt-8'>
        <Link href='/blog'>
          <Button variant='outline' size='lg'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to All Articles
          </Button>
        </Link>
      </div>
    </motion.article>
  );
}
