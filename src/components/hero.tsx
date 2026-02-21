'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

interface PersonalInfo {
  name: string;
  title: string;
  github: string | null;
  linkedin: string | null;
  email: string | null;
  subtitle: string | null;
  resume: string | null;
}

const DEFAULT: PersonalInfo = {
  name: 'Swarup Das',
  title: 'Full Stack Developer',
  github: 'https://github.com/swarupcs',
  linkedin: 'https://linkedin.com/in/swarup-d',
  email: 'swarupd1999@gmail.com',
  subtitle:
    'I craft elegant digital experiences while building scalable full-stack systems.',
  resume: null,
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

  if (loading) return <section className='h-screen' />;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const initials =
    info.name
      ?.split(' ')
      .map((n) => n[0])
      .join('') || 'SD';

  return (
    <section className='relative py-24 md:py-36 overflow-hidden'>
      {/* Subtle background dots */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage:
            'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.4,
        }}
      />
      {/* Soft glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none' />

      <div className='relative z-10 w-full max-w-3xl mx-auto px-6 text-center'>
        <motion.div
          variants={container}
          initial='hidden'
          animate='visible'
          className='space-y-10'
        >
          {/* Avatar */}
          <motion.div variants={item} className='flex justify-center'>
            <div className='relative'>
              <div className='w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center text-3xl font-black text-primary shadow-lg'>
                {initials}
              </div>
              {/* Online dot */}
              <span className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full' />
            </div>
          </motion.div>

          {/* Name + title */}
          <motion.div variants={item} className='space-y-4'>
            <p className='text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase'>
              Full Stack Developer
            </p>
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-tight'>
              Hi, I&apos;m{' '}
              <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
                {info.name}
              </span>
            </h1>
            {info.subtitle && (
              <p className='text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto'>
                {info.subtitle}
              </p>
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={item}
            className='flex flex-wrap items-center justify-center gap-3'
          >
            <Link
              href='/projects'
              className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-base font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5'
            >
              View my work
              <ArrowRight className='w-4 h-4' />
            </Link>
            {info.resume && (
              <Link
                href={info.resume}
                target='_blank'
                className='inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-base font-semibold text-foreground hover:bg-muted transition-all hover:-translate-y-0.5'
              >
                <FileText className='w-4 h-4' />
                Resume / CV
              </Link>
            )}
            <Link
              href={`mailto:${info.email}`}
              className='inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-base font-semibold text-foreground hover:bg-muted transition-all hover:-translate-y-0.5'
            >
              Get in touch
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={item}
            className='flex items-center justify-center gap-3'
          >
            {info.github && (
              <Link
                href={info.github}
                target='_blank'
                className='w-11 h-11 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-muted transition-all'
              >
                <Github className='w-5 h-5' />
              </Link>
            )}
            {info.linkedin && (
              <Link
                href={info.linkedin}
                target='_blank'
                className='w-11 h-11 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-muted transition-all'
              >
                <Linkedin className='w-5 h-5' />
              </Link>
            )}
            {info.email && (
              <Link
                href={`mailto:${info.email}`}
                className='w-11 h-11 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-muted transition-all'
              >
                <Mail className='w-5 h-5' />
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
