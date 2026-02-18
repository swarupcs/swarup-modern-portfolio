'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Swarup Das',
    title: 'Full Stack Developer',
    github_url: 'https://github.com/swarupcs',
    linkedin_url: 'https://linkedin.com/in/swarup-d',
    email: 'swarupd1999@gmail.com',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const res = await fetch('/api/portfolio/personal-info');  
        if (res.ok) {
          const data = await res.json();
          setPersonalInfo(data);
        }
      } catch (error) {
        console.error('Error fetching personal info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
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
          {/* Avatar with glow and animation */}
          <motion.div variants={itemVariants} className='relative'>
            <div className='absolute inset-0 w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-primary/40 via-secondary/20 to-accent/10 rounded-full blur-2xl animate-pulse' />
            <div className='relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 p-1 glow-primary'>
              <div className='w-full h-full rounded-full bg-gradient-to-br from-card to-card/80 flex items-center justify-center text-6xl md:text-7xl font-black bg-gradient-purple-blue'>
                SD
              </div>
            </div>
          </motion.div>

          {/* Main heading with gradient and premium styling */}
          <motion.div
            variants={itemVariants}
            className='text-center space-y-4 max-w-4xl'
          >
            <div className='text-5xl md:text-7xl font-black tracking-tight text-balance'>
              <span className='gradient-purple-blue'>
                Hi, I&apos;m {personalInfo.name}
              </span>
              <span className='block text-3xl md:text-5xl mt-2 text-muted-foreground font-light'>
                —
              </span>
            </div>
            <p className='text-2xl md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-shift'>
              {personalInfo.title}
            </p>
          </motion.div>

          {/* Bio with inline links */}
          <motion.p
            variants={itemVariants}
            className='text-base md:text-lg text-muted-foreground max-w-2xl text-center leading-relaxed text-balance'
          >
            I craft elegant digital experiences while building scalable
            full-stack systems. My work spans React & Next.js frontends, Node.js
            APIs, and relational & NoSQL databases (PostgreSQL, MongoDB), with
            an emphasis on maintainability, performance, and developer
            experience.
            <Link
              href='https://nextjs.org/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-foreground font-medium hover:text-primary transition-colors border-b border-primary/30 hover:border-primary'
            >
              Next.js
            </Link>
            ,{' '}
            <Link
              href='https://www.typescriptlang.org/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-foreground font-medium hover:text-primary transition-colors border-b border-primary/30 hover:border-primary'
            >
              TypeScript
            </Link>
            , and{' '}
            <Link
              href='https://www.postgresql.org/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-foreground font-medium hover:text-primary transition-colors border-b border-primary/30 hover:border-primary'
            >
              PostgreSQL
            </Link>
            .
          </motion.p>

          {/* CTAs with premium styling */}
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
              <Link href={`mailto:${personalInfo.email}`}>Get in touch</Link>
            </Button>
          </motion.div>

          {/* Social links with hover effects */}
          <motion.div variants={itemVariants} className='flex gap-4 pt-8'>
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={personalInfo.github_url}
                target='_blank'
                className='w-12 h-12 rounded-full border border-white/20 hover:border-primary/70 hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 group'
              >
                <Github className='h-5 w-5 group-hover:scale-120 transition-transform' />
                <span className='sr-only'>GitHub</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={personalInfo.linkedin_url}
                target='_blank'
                className='w-12 h-12 rounded-full border border-white/20 hover:border-secondary/70 hover:bg-secondary/10 flex items-center justify-center text-muted-foreground hover:text-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 group'
              >
                <Linkedin className='h-5 w-5 group-hover:scale-120 transition-transform' />
                <span className='sr-only'>LinkedIn</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`mailto:${personalInfo.email}`}
                className='w-12 h-12 rounded-full border border-white/20 hover:border-accent/70 hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 group'
              >
                <Mail className='h-5 w-5 group-hover:scale-120 transition-transform' />
                <span className='sr-only'>Email</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
