'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className='relative pt-32 pb-20 md:pt-48 md:pb-32'>
      <div className='container px-4 md:px-6 max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-8 text-center'
        >
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight'>
            Hi, I&apos;m <span className='text-primary'>Swarup Das</span>
          </h1>

          <p className='text-xl md:text-2xl text-muted-foreground'>
            Full-Stack Developer & Creative Problem Solver
          </p>

          <p className='text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
            I craft high-performance web applications using{' '}
            <span className='font-medium text-foreground'>TypeScript</span>,{' '}
            <span className='font-medium text-foreground'>React</span>,{' '}
            <span className='font-medium text-foreground'>Next.js</span>,{' '}
            <span className='font-medium text-foreground'>Bun</span>, and{' '}
            <span className='font-medium text-foreground'>PostgreSQL</span> —
            focusing on scalability, performance, and delightful user
            experiences.
          </p>

          {/* Tech Stack Pills */}
          <div className='flex flex-wrap justify-center gap-2 pt-3'>
            {[
              'TypeScript',
              'React',
              'Next.js',
              'Bun',
              'Node.js',
              'PostgreSQL',
            ].map((tech) => (
              <span
                key={tech}
                className='px-3 py-1 text-sm rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors'
              >
                {tech}
              </span>
            ))}
          </div>

          <div className='flex flex-wrap gap-3 justify-center pt-4'>
            <Button size='lg' asChild>
              <Link href='/work'>View my work</Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link href='mailto:swarupd1999@gmail.com'>Get in touch</Link>
            </Button>
          </div>

          <div className='flex gap-4 pt-8 justify-center'>
            <Link
              href='https://github.com'
              target='_blank'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Github className='h-5 w-5' />
              <span className='sr-only'>GitHub</span>
            </Link>
            <Link
              href='https://linkedin.com'
              target='_blank'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Linkedin className='h-5 w-5' />
              <span className='sr-only'>LinkedIn</span>
            </Link>
            <Link
              href='mailto:swarupd1999@gmail.com'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Mail className='h-5 w-5' />
              <span className='sr-only'>Email</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
