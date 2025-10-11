'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className='min-h-screen flex items-center justify-center relative overflow-hidden pt-20'>
      {/* Background gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5' />

      <div className='container px-4 md:px-6 relative z-10'>
        <div className='flex flex-col items-center text-center space-y-8'>
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='relative mt-8'
          >
            <div className='w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl'>
              <Image
                src='/placeholder.svg?height=160&width=160'
                alt='Profile'
                width={160}
                height={160}
                className='object-cover'
              />
            </div>
            <div className='absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-background animate-pulse' />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='space-y-4 max-w-3xl'
          >
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight'>
              Hi, I'm <span className='text-primary'>Swarup Das</span>
            </h1>
            <p className='text-xl md:text-2xl text-muted-foreground'>
              Full-Stack Developer & Creative Problem Solver
            </p>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              I build exceptional digital experiences with modern web
              technologies. Passionate about clean code, user-centric design,
              and innovative solutions.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='grid grid-cols-2 md:grid-cols-4 gap-8 py-8'
          >
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-primary mb-1'>
                5+
              </div>
              <div className='text-sm text-muted-foreground'>
                Years Experience
              </div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-primary mb-1'>
                50+
              </div>
              <div className='text-sm text-muted-foreground'>
                Projects Completed
              </div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-primary mb-1'>
                25+
              </div>
              <div className='text-sm text-muted-foreground'>Happy Clients</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-primary mb-1'>
                1000+
              </div>
              <div className='text-sm text-muted-foreground'>
                Cups of Coffee
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='flex flex-col sm:flex-row gap-4'
          >
            <Button size='lg' asChild>
              <Link href='/work'>
                View My Work <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link href='/contact'>
                <Mail className='mr-2 h-5 w-5' />
                Get In Touch
              </Link>
            </Button>
            <Button size='lg' variant='outline'>
              <Download className='mr-2 h-5 w-5' />
              Download CV
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className='flex gap-4'
          >
            <Link href='https://github.com' target='_blank'>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-full hover:scale-110 transition-transform'
              >
                <Github className='h-5 w-5' />
              </Button>
            </Link>
            <Link href='https://linkedin.com' target='_blank'>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-full hover:scale-110 transition-transform'
              >
                <Linkedin className='h-5 w-5' />
              </Button>
            </Link>
            <Link href='mailto:john@example.com'>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-full hover:scale-110 transition-transform'
              >
                <Mail className='h-5 w-5' />
              </Button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
            }}
            className='absolute bottom-8'
          >
            <div className='w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-2'>
              <div className='w-1 h-3 bg-muted-foreground rounded-full' />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
