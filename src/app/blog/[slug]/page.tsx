'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPostBySlug, BlogPost } from '@/lib/hashnode';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const post = await getPostBySlug(slug);
        if (post) {
          setBlogPost(post);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share && blogPost) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen pt-24 pb-20 flex items-center justify-center'>
        <div className='text-center'>
          <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]' />
          <p className='mt-4 text-muted-foreground'>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className='min-h-screen pt-24 pb-20'>
        <div className='container px-4 md:px-6 max-w-4xl mx-auto'>
          <Link href='/blog'>
            <Button variant='ghost' className='gap-2 mb-8'>
              <ArrowLeft className='h-4 w-4' />
              Back to Blog
            </Button>
          </Link>
          <div className='text-center py-12'>
            <p className='text-red-500'>{error || 'Post not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen pt-24 pb-20'>
      <article className='container px-4 md:px-6 max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-8'
        >
          {/* Back Button */}
          <Link href='/blog'>
            <Button variant='ghost' className='gap-2'>
              <ArrowLeft className='h-4 w-4' />
              Back to Blog
            </Button>
          </Link>

          {/* Featured Image */}
          <div className='relative aspect-video rounded-xl overflow-hidden'>
            <Image
              src={blogPost.image || '/placeholder.svg'}
              alt={blogPost.title}
              fill
              className='object-cover'
            />
          </div>

          {/* Header */}
          <div className='space-y-4'>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <Badge className='bg-primary'>{blogPost.category}</Badge>
              <div className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                <span>{new Date(blogPost.date).toLocaleDateString()}</span>
              </div>
              <div className='flex items-center gap-1'>
                <Clock className='h-4 w-4' />
                <span>{blogPost.readTime}</span>
              </div>
            </div>

            <h1 className='text-4xl md:text-5xl font-bold'>{blogPost.title}</h1>
            <p className='text-xl text-muted-foreground'>
              {blogPost.description}
            </p>

            <div className='flex items-center gap-2'>
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant='secondary'>
                  {tag}
                </Badge>
              ))}
            </div>

            <div className='flex items-center gap-4 pt-4 border-t'>
              <Button
                variant='outline'
                size='sm'
                className='gap-2 bg-transparent'
                onClick={handleShare}
              >
                <Share2 className='h-4 w-4' />
                Share
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className='prose prose-lg dark:prose-invert max-w-none'>
            <div
              dangerouslySetInnerHTML={{
                __html: blogPost.content || '',
              }}
            />
          </div>
        </motion.div>
      </article>
    </div>
  );
}