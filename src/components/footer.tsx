'use client';

import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
      href: 'https://twitter.com/swarupdcs',
      label: 'Twitter',
      color: 'hover:text-sky-500',
    },
  ];

  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto px-4 md:px-6 max-w-4xl'>
        <div className='py-16 md:py-24 text-center space-y-8'>
          <h3 className='text-2xl md:text-3xl font-bold'>
            Let's work together
          </h3>
          <p className='text-base md:text-lg text-muted-foreground max-w-2xl mx-auto'>
            Have an exciting project in mind? I'd love to hear about it. Let's
            build something amazing together.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' asChild>
              <Link href='mailto:swarupd1999@gmail.com'>Get in touch</Link>
            </Button>
            {/* <Button size='lg' variant='outline' asChild>
              <Link href='https://calendly.com' target='_blank'>
                Book a Call
              </Link>
            </Button> */}
          </div>
        </div>

        <div className='py-8 border-t'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <p className='text-sm text-muted-foreground'>
              © {currentYear} Swarup Das. All rights reserved.
            </p>

            {/* Social Links */}
            <div className='flex gap-3'>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-9 h-9 rounded-full bg-secondary hover:bg-accent flex items-center justify-center transition-colors'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className='h-4 w-4' />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
