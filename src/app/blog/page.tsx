'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getAllPosts, BlogPost } from '@/lib/hashnode';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await getAllPosts();
        setBlogPosts(posts);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className='min-h-screen pt-24 pb-20'>
      <div className='px-4 md:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-12'
        >
          {/* Header */}
          <div className='space-y-4 text-center'>
            <h1 className='text-4xl md:text-5xl font-bold'>Blog</h1>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Thoughts on software development, design, and technology
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className='text-center py-12'>
              <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]' />
              <p className='mt-4 text-muted-foreground'>Loading posts...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className='text-center py-12'>
              <p className='text-red-500'>{error}</p>
            </div>
          )}

          {/* Blog Posts Grid */}
          {!loading && !error && (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
              {blogPosts.length === 0 ? (
                <div className='col-span-full text-center py-12'>
                  <p className='text-muted-foreground'>No blog posts found.</p>
                </div>
              ) : (
                blogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <Card className='overflow-hidden h-full hover:shadow-lg transition-shadow duration-300 group'>
                        <div className='relative aspect-video overflow-hidden'>
                          <Image
                            src={post.image || '/placeholder.svg'}
                            alt={post.title}
                            fill
                            className='object-cover transition-transform duration-300 group-hover:scale-105'
                          />
                          <div className='absolute top-4 left-4'>
                            <Badge className='bg-primary'>{post.category}</Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <div className='flex items-center gap-4 text-sm text-muted-foreground mb-2'>
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-4 w-4' />
                              <span>
                                {new Date(post.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <Clock className='h-4 w-4' />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          <CardTitle className='line-clamp-2 group-hover:text-primary transition-colors'>
                            {post.title}
                          </CardTitle>
                          <CardDescription className='line-clamp-3'>
                            {post.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className='flex flex-wrap gap-2'>
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant='secondary'>
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className='mt-4 flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all'>
                            Read more{' '}
                            <ArrowRight className='h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform' />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}