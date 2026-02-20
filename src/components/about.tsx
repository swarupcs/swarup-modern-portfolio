'use client';

import { useEffect, useState } from 'react';
import { Coffee, Heart, Zap, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    {
      icon: Github,
      href: info?.github || '#',
      label: 'GitHub',
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
    },
    {
      icon: Linkedin,
      href: info?.linkedin || '#',
      label: 'LinkedIn',
      color: 'hover:text-blue-600',
    },
    {
      icon: Twitter,
      href: info?.twitter || '#',
      label: 'Twitter',
      color: 'hover:text-sky-500',
    },
  ].filter((s) => s.href !== '#');

  // Use highlights from DB as interests, fallback to defaults
  const interests = about?.highlights?.length
    ? about.highlights.map((h, i) => ({
        icon: [Coffee, Heart, Zap][i % 3],
        label: h,
        color: ['text-orange-500', 'text-red-500', 'text-yellow-500'][i % 3],
      }))
    : DEFAULT_INTERESTS;

  return (
    <section id='about' className='py-20 md:py-32'>
      <div className='container px-4 md:px-6 max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='space-y-6 mb-16 text-center'
        >
          <p className='text-sm text-primary mb-3 uppercase tracking-widest font-semibold'>
            About
          </p>
          <h2 className='text-5xl md:text-6xl font-black gradient-purple-blue'>
            Get to Know Me
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Passionate developer driven by innovation and a love for elegant
            code
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='space-y-8'
          >
            {about?.bio ? (
              <p className='text-xl text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out hover:text-foreground'>
                {about.bio}
              </p>
            ) : (
              <p className='text-xl text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out hover:text-foreground'>
                I&apos;m a passionate{' '}
                <span className='text-primary font-semibold'>
                  full-stack developer
                </span>{' '}
                dedicated to building exceptional digital experiences. I
                transform complex problems into elegant, scalable solutions
                using modern web technologies.
              </p>
            )}

            {about?.description ? (
              <p className='text-xl text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out hover:text-foreground'>
                {about.description}
              </p>
            ) : (
              <p className='text-xl text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out hover:text-foreground'>
                My expertise spans{' '}
                <span className='gradient-blue-pink font-semibold'>
                  React, Next.js, Node.js, TypeScript, and cloud platforms
                </span>
                . I&apos;m obsessed with clean code, performance optimization,
                and creating interfaces that delight users.
              </p>
            )}

            {/* Interests / Highlights */}
            <div className='flex flex-wrap gap-3 pt-4'>
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08 }}
                  className='cursor-pointer'
                >
                  <div className='px-4 py-2 rounded-full border border-white/20 hover:border-primary/50 bg-white/5 hover:bg-primary/10 transition-all duration-300 flex items-center gap-2 group'>
                    <interest.icon
                      className={`h-4 w-4 ${interest.color} group-hover:scale-110 transition-transform`}
                    />
                    <span className='text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors'>
                      {interest.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className='flex gap-4 pt-6'
              >
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button
                      variant='outline'
                      size='icon'
                      className={`rounded-xl transition-all duration-300 hover:scale-110 hover:translate-x-1 ${social.color}`}
                    >
                      <social.icon className='h-5 w-5' />
                      <span className='sr-only'>{social.label}</span>
                    </Button>
                  </Link>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right: Code Snippet — dynamic data */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className='bg-card/50 backdrop-blur border-2 overflow-hidden transition-all duration-300 hover:translate-x-1 hover:shadow-lg'>
              <CardContent className='p-6'>
                <div className='flex items-center gap-2 mb-4 pb-3 border-b'>
                  <div className='flex gap-2'>
                    <div className='w-3 h-3 bg-red-500 rounded-full' />
                    <div className='w-3 h-3 bg-yellow-500 rounded-full' />
                    <div className='w-3 h-3 bg-green-500 rounded-full' />
                  </div>
                  <span className='text-sm text-muted-foreground ml-2 font-mono'>
                    developer.js
                  </span>
                </div>

                <div className='font-mono text-sm space-y-1'>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className='text-purple-400'
                  >
                    <span className='text-purple-400'>const</span>{' '}
                    <span className='text-blue-400'>developer</span>{' '}
                    <span className='text-gray-400'>=</span>{' '}
                    <span className='text-yellow-400'>{'{'}</span>
                  </motion.div>

                  {[
                    {
                      key: 'name',
                      value: info?.name || 'Swarup Das',
                      delay: 0.6,
                    },
                    {
                      key: 'title',
                      value: info?.title || 'Full-Stack Developer',
                      delay: 0.7,
                    },
                    {
                      key: 'location',
                      value: info?.location || 'India',
                      delay: 0.8,
                    },
                    {
                      key: 'available',
                      value: 'true',
                      delay: 0.9,
                      isBoolean: true,
                    },
                  ].map(({ key, value, delay, isBoolean }) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay }}
                      viewport={{ once: true }}
                      className='ml-4 transition-all duration-300 hover:translate-x-1 cursor-default'
                    >
                      <span className='text-blue-400'>{key}</span>
                      <span className='text-gray-400'>: </span>
                      {isBoolean ? (
                        <span className='text-orange-400'>{value}</span>
                      ) : (
                        <span className='text-green-400'>
                          &apos;{value}&apos;
                        </span>
                      )}
                      <span className='text-gray-400'>,</span>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    viewport={{ once: true }}
                    className='ml-4 transition-all duration-300 hover:translate-x-1 cursor-default'
                  >
                    <span className='text-blue-400'>passion</span>
                    <span className='text-gray-400'>: </span>
                    <span className='text-green-400'>
                      &apos;Building amazing things&apos;
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    viewport={{ once: true }}
                    className='text-yellow-400'
                  >
                    {'}'}
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
