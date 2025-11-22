'use client';

import BlogList from '@/components/blog-list';
import { motion } from 'framer-motion';

export default function BlogPage() {
  return (
    <div className='min-h-screen pt-24 pb-20'>
      <div className='container px-4 md:px-6'>
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

          {/* Blog Posts from Hashnode */}
          <div className='max-w-4xl mx-auto w-full'>
            <BlogList />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
