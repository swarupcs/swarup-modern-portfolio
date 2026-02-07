'use client';

import { Coffee, Heart, Zap, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
  const interests = [
    { icon: Coffee, label: 'Coffee Enthusiast', color: 'text-orange-500' },
    { icon: Heart, label: 'Open Source Contributor', color: 'text-red-500' },
    { icon: Zap, label: 'Problem Solver', color: 'text-yellow-500' },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/yourusername',
      label: 'GitHub',
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/yourusername',
      label: 'LinkedIn',
      color: 'hover:text-blue-600',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/yourusername',
      label: 'Twitter',
      color: 'hover:text-sky-500',
    },
  ];

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
            <p className='text-xl text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out hover:text-foreground'>
              I&apos;m a passionate{' '}
              <span className='text-primary font-semibold'>
                full-stack developer
              </span>{' '}
              dedicated to building exceptional digital experiences. I transform
              complex problems into elegant, scalable solutions using modern web
              technologies.
            </p>

            <p className='text-xl text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out hover:text-foreground'>
              My expertise spans{' '}
              <span className='gradient-blue-pink font-semibold'>
                React, Next.js, Node.js, TypeScript, and cloud platforms
              </span>
              . I&apos;m obsessed with clean code, performance optimization, and
              creating interfaces that delight users.
            </p>

            {/* Interests */}
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
          </motion.div>

          {/* Right: Code Snippet */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className='bg-card/50 backdrop-blur border-2 overflow-hidden transition-all duration-300 hover:translate-x-1 hover:shadow-lg'>
              <CardContent className='p-6'>
                {/* Terminal Header */}
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

                {/* Code Content */}
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

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className='ml-4 transition-all duration-300 hover:translate-x-1 cursor-default'
                  >
                    <span className='text-blue-400'>name</span>
                    <span className='text-gray-400'>:</span>{' '}
                    <span className='text-green-400'>
                      &apos;Swarup Das&apos;
                    </span>
                    <span className='text-gray-400'>,</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    viewport={{ once: true }}
                    className='ml-4 transition-all duration-300 hover:translate-x-1 cursor-default'
                  >
                    <span className='text-blue-400'>title</span>
                    <span className='text-gray-400'>:</span>{' '}
                    <span className='text-green-400'>
                      &apos;Full-Stack Developer&apos;
                    </span>
                    <span className='text-gray-400'>,</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    viewport={{ once: true }}
                    className='ml-4 transition-all duration-300 hover:translate-x-1 cursor-default'
                  >
                    <span className='text-blue-400'>location</span>
                    <span className='text-gray-400'>:</span>{' '}
                    <span className='text-green-400'>
                      &apos;Kolkata, India&apos;
                    </span>
                    <span className='text-gray-400'>,</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    viewport={{ once: true }}
                    className='ml-4 transition-all duration-300 hover:translate-x-1 cursor-default'
                  >
                    <span className='text-blue-400'>available</span>
                    <span className='text-gray-400'>:</span>{' '}
                    <span className='text-orange-400'>true</span>
                    <span className='text-gray-400'>,</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    viewport={{ once: true }}
                    className='ml-4 transition-all duration-300 hover:translate-x-1 cursor-default'
                  >
                    <span className='text-blue-400'>skills</span>
                    <span className='text-gray-400'>:</span>{' '}
                    <span className='text-yellow-400'>[</span>
                    <span className='text-green-400'>&apos;React&apos;</span>
                    <span className='text-gray-400'>,</span>{' '}
                    <span className='text-green-400'>&apos;Node.js&apos;</span>
                    <span className='text-gray-400'>,</span>{' '}
                    <span className='text-green-400'>
                      &apos;TypeScript&apos;
                    </span>
                    <span className='text-yellow-400'>]</span>
                    <span className='text-gray-400'>,</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    viewport={{ once: true }}
                    className='ml-4 transition-all duration-300 hover:translate-x-1 cursor-default'
                  >
                    <span className='text-blue-400'>passion</span>
                    <span className='text-gray-400'>:</span>{' '}
                    <span className='text-green-400'>
                      &apos;Building amazing things&apos;
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
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
