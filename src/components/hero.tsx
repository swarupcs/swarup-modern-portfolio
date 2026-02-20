'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

interface PersonalInfo {
  name: string;
  title: string;
  github: string | null;
  linkedin: string | null;
  email: string | null;
  subtitle: string | null;
}

const DEFAULT: PersonalInfo = {
  name: 'Swarup Das',
  title: 'Full Stack Developer',
  github: 'https://github.com/swarupcs',
  linkedin: 'https://linkedin.com/in/swarup-d',
  email: 'swarupd1999@gmail.com',
  subtitle: null,
};

export default function Hero() {
  const [info, setInfo] = useState<PersonalInfo>(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio/personal-info')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setInfo(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className='relative pt-20 pb-16 md:pt-32 md:pb-24' />;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className='relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden'>
      {/* Animated background gradient orbs */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-float' />
        <div
          className='absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-secondary/5 to-transparent rounded-full blur-3xl animate-float'
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className='container px-4 md:px-6 max-w-6xl mx-auto relative z-10'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='flex flex-col items-center gap-12'
        >
          {/* Avatar */}
          <motion.div variants={itemVariants} className='relative'>
            <div className='absolute inset-0 w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-primary/40 via-secondary/20 to-accent/10 rounded-full blur-2xl animate-pulse' />
            <div className='relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 p-1 glow-primary'>
              <div className='w-full h-full rounded-full bg-gradient-to-br from-card to-card/80 flex items-center justify-center text-6xl md:text-7xl font-black bg-gradient-purple-blue'>
                {info.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('') || 'SD'}
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            variants={itemVariants}
            className='text-center space-y-4 max-w-4xl'
          >
            <div className='text-5xl md:text-7xl font-black tracking-tight text-balance'>
              <span className='gradient-purple-blue'>
                Hi, I&apos;m {info.name}
              </span>
              <span className='block text-3xl md:text-5xl mt-2 text-muted-foreground font-light'>
                —
              </span>
            </div>
            <p className='text-2xl md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-shift'>
              {info.title}
            </p>
            {info.subtitle && (
              <p className='text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
                {info.subtitle}
              </p>
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className='flex flex-col sm:flex-row gap-5 pt-8'
          >
            <Button
              size='lg'
              className='rounded-full font-semibold group bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-lg hover:shadow-primary/50 border-0 px-8 py-6 text-base transition-all duration-300 hover:scale-105'
              asChild
            >
              <Link href='/projects' className='flex items-center gap-3'>
                View my work
                <ArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </Link>
            </Button>
            <Button
              size='lg'
              className='rounded-full font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-base transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 bg-transparent dark:bg-primary/10 dark:hover:bg-primary'
              asChild
            >
              <Link href={`mailto:${info.email}`}>Get in touch</Link>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className='flex gap-4 pt-8'>
            {info.github && (
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={info.github}
                  target='_blank'
                  className='w-12 h-12 rounded-full border border-white/20 hover:border-primary/70 hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 group'
                >
                  <Github className='h-5 w-5' />
                  <span className='sr-only'>GitHub</span>
                </Link>
              </motion.div>
            )}
            {info.linkedin && (
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={info.linkedin}
                  target='_blank'
                  className='w-12 h-12 rounded-full border border-white/20 hover:border-secondary/70 hover:bg-secondary/10 flex items-center justify-center text-muted-foreground hover:text-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 group'
                >
                  <Linkedin className='h-5 w-5' />
                  <span className='sr-only'>LinkedIn</span>
                </Link>
              </motion.div>
            )}
            {info.email && (
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`mailto:${info.email}`}
                  className='w-12 h-12 rounded-full border border-white/20 hover:border-accent/70 hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 group'
                >
                  <Mail className='h-5 w-5' />
                  <span className='sr-only'>Email</span>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
