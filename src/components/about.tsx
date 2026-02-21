'use client';

import { useEffect, useState } from 'react';
import { Coffee, Heart, Zap, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AboutData {
  bio: string | null;
  description: string | null;
  highlights: string[];
}

interface PersonalInfo {
  name: string | null;
  title: string | null;
  location: string | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
}

const DEFAULT_INTERESTS = [
  { icon: Coffee, label: 'Coffee Enthusiast', color: 'text-orange-500' },
  { icon: Heart, label: 'Open Source Contributor', color: 'text-red-500' },
  { icon: Zap, label: 'Problem Solver', color: 'text-yellow-500' },
];

export default function About() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [info, setInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/portfolio/about').then((r) => (r.ok ? r.json() : null)),
      fetch('/api/portfolio/personal-info').then((r) =>
        r.ok ? r.json() : null,
      ),
    ])
      .then(([aboutData, infoData]) => {
        if (aboutData) setAbout(aboutData);
        if (infoData) setInfo(infoData);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const socialLinks = [
    { icon: Github, href: info?.github || '', label: 'GitHub' },
    { icon: Linkedin, href: info?.linkedin || '', label: 'LinkedIn' },
    { icon: Twitter, href: info?.twitter || '', label: 'Twitter' },
  ].filter((s) => s.href);

  const interests = about?.highlights?.length
    ? about.highlights.map((h, i) => ({
        icon: [Coffee, Heart, Zap][i % 3],
        label: h,
        color: ['text-orange-500', 'text-red-500', 'text-yellow-500'][i % 3],
      }))
    : DEFAULT_INTERESTS;

  return (
    <section id='about' className='py-10 md:py-14 scroll-mt-20'>
      <div className='max-w-3xl mx-auto px-6'>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-8'
        >
          <p className='text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-3'>
            About
          </p>
          <h2 className='text-3xl md:text-4xl font-black tracking-tight'>Me</h2>
        </motion.div>

        <div className='space-y-6'>
          {/* Avatar + name row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='flex items-center gap-4'
          >
            <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center text-xl font-black text-primary shrink-0'>
              {info?.name
                ?.split(' ')
                .map((n) => n[0])
                .join('') || 'SD'}
            </div>
            <div>
              <h3 className='text-base font-bold'>
                {info?.name || 'Swarup Das'}
              </h3>
              <p className='text-sm text-muted-foreground'>
                {info?.title || 'Full Stack Developer'}
              </p>
              {info?.location && (
                <p className='text-xs text-muted-foreground mt-0.5'>
                  📍 {info.location}
                </p>
              )}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className='space-y-4'
          >
            <p className='text-sm text-muted-foreground leading-relaxed'>
              {about?.bio ||
                "I'm a passionate full-stack developer dedicated to building exceptional digital experiences. I transform complex problems into elegant, scalable solutions using modern web technologies."}
            </p>
            {about?.description && (
              <p className='text-sm text-muted-foreground leading-relaxed'>
                {about.description}
              </p>
            )}
          </motion.div>

          {/* Code snippet */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='rounded-xl border border-border bg-card overflow-hidden'
          >
            {/* Titlebar */}
            <div className='flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30'>
              <div className='flex gap-1.5'>
                <div className='w-2.5 h-2.5 bg-red-500 rounded-full' />
                <div className='w-2.5 h-2.5 bg-yellow-500 rounded-full' />
                <div className='w-2.5 h-2.5 bg-green-500 rounded-full' />
              </div>
              <span className='text-xs text-muted-foreground font-mono ml-2'>
                developer.ts
              </span>
            </div>
            {/* Code */}
            <div className='p-4 font-mono text-xs space-y-1 leading-relaxed'>
              <div>
                <span className='text-purple-400'>const</span>{' '}
                <span className='text-blue-400'>developer</span>{' '}
                <span className='text-muted-foreground'>=</span>{' '}
                <span className='text-yellow-400'>{'{'}</span>
              </div>
              {[
                { key: 'name', value: info?.name || 'Swarup Das' },
                { key: 'role', value: info?.title || 'Full Stack Developer' },
                { key: 'location', value: info?.location || 'Kolkata, India' },
              ].map(({ key, value }) => (
                <div key={key} className='ml-4'>
                  <span className='text-blue-400'>{key}</span>
                  <span className='text-muted-foreground'>: </span>
                  <span className='text-green-400'>&apos;{value}&apos;</span>
                  <span className='text-muted-foreground'>,</span>
                </div>
              ))}
              <div className='ml-4'>
                <span className='text-blue-400'>available</span>
                <span className='text-muted-foreground'>: </span>
                <span className='text-orange-400'>true</span>
                <span className='text-muted-foreground'>,</span>
              </div>
              <div className='ml-4'>
                <span className='text-blue-400'>passion</span>
                <span className='text-muted-foreground'>: </span>
                <span className='text-green-400'>
                  &apos;Building amazing things&apos;
                </span>
              </div>
              <div>
                <span className='text-yellow-400'>{'}'}</span>
              </div>
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className='flex flex-wrap gap-2'
          >
            {interests.map((interest, index) => (
              <div
                key={index}
                className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors'
              >
                <interest.icon className={`h-3.5 w-3.5 ${interest.color}`} />
                {interest.label}
              </div>
            ))}
          </motion.div>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className='flex gap-2'
            >
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-muted transition-all'
                >
                  <social.icon className='h-4 w-4' />
                  <span className='sr-only'>{social.label}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
