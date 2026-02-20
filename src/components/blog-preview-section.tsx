'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import BlogList from '@/components/blog-list';

export default function BlogPreviewSection() {
  return (
    <section id='blogs' className='py-20 md:py-32'>
      <div className='container px-4 md:px-6 max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-16 text-center'
        >
          <p className='text-sm text-muted-foreground mb-2 uppercase tracking-wide'>
            Featured
          </p>
          <h2 className='text-3xl md:text-4xl font-bold'>Blogs</h2>
        </motion.div>
        <BlogList limit={2} />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className='mt-16 text-center'
        >
          <Link
            href='/blog'
            className='text-base text-primary hover:underline underline-offset-4 font-medium'
          >
            Show all blogs
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
