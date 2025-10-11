'use client';

import {
  Coffee,
  Heart,
  Zap,
  Github,
  Linkedin,
  Twitter,
  Globe,
} from 'lucide-react';
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
      href: 'https://github.com/swarupcs',
      label: 'GitHub',
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/swarup-d',
      label: 'LinkedIn',
      color: 'hover:text-blue-600',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/swarupcs',
      label: 'Twitter',
      color: 'hover:text-sky-500',
    },
    {
      icon: Globe,
      href: 'https://yourwebsite.com',
      label: 'Website',
      color: 'hover:text-green-600',
    },
  ];

  return (
    <section id='about' className='py-20 px-4 md:px-6'>
      <div className='container mx-auto max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-6'>
            About <span className='text-primary'>Me</span>
          </h2>
          <div className='w-20 h-1 bg-primary mx-auto rounded-full' />
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className='space-y-6'
          >
            <p className='text-lg text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out hover:translate-x-1'>
              I'm a passionate full-stack developer with 5+ years of experience
              building scalable web applications. I love turning complex
              problems into simple, beautiful solutions. When I'm not coding,
              you'll find me exploring new technologies or contributing to open
              source projects.
            </p>

            <p className='text-lg text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out hover:translate-x-1'>
              My expertise spans across modern web technologies including React,
              Next.js, Node.js, and TypeScript. I'm committed to writing clean,
              maintainable code and creating delightful user experiences.
            </p>

            {/* Interests */}
            <div className='flex flex-wrap gap-4 pt-4'>
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className='cursor-pointer'
                >
                  <Card className='border-2 hover:border-primary/50 transition-all duration-300'>
                    <CardContent className='flex items-center gap-2 p-3'>
                      <interest.icon className={`h-5 w-5 ${interest.color}`} />
                      <span className='text-sm font-medium'>
                        {interest.label}
                      </span>
                    </CardContent>
                  </Card>
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
                    <span className='text-green-400'>'Swarup Das'</span>
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
                      'Full-Stack Developer'
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
                    <span className='text-green-400'>'West Bengal, India'</span>
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
                    <span className='text-green-400'>'React'</span>
                    <span className='text-gray-400'>,</span>{' '}
                    <span className='text-green-400'>'Node.js'</span>
                    <span className='text-gray-400'>,</span>{' '}
                    <span className='text-green-400'>'TypeScript'</span>
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
                      'Building amazing things'
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
