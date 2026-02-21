'use client';

import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/swarupcs', label: 'GitHub' },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/swarup-d',
      label: 'LinkedIn',
    },
    { icon: Twitter, href: 'https://twitter.com/swarupdcs', label: 'Twitter' },
    { icon: Mail, href: 'mailto:swarupd1999@gmail.com', label: 'Email' },
  ];

  const navLinks = [
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className='border-t bg-background'>
      <div className='max-w-3xl mx-auto px-6'>
        {/* CTA */}
        <div className='py-12 text-center space-y-5 border-b border-border'>
          <p className='text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase'>
            Get in touch
          </p>
          <h3 className='text-2xl md:text-3xl font-black tracking-tight'>
            Hey, you scrolled this far —<br className='hidden sm:block' />{' '}
            let&apos;s talk.
          </h3>
          <p className='text-sm text-muted-foreground max-w-md mx-auto'>
            Open to full-time roles, freelance projects, and interesting
            collabs.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-3'>
            <Link
              href='mailto:swarupd1999@gmail.com'
              className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25'
            >
              Get in touch
              <ArrowUpRight className='w-3.5 h-3.5' />
            </Link>
            <Link
              href='https://linkedin.com/in/swarup-d'
              target='_blank'
              className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-all hover:-translate-y-0.5'
            >
              LinkedIn
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='py-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <p className='text-xs text-muted-foreground'>
              © {currentYear} Swarup Das
            </p>
            <span className='text-border'>·</span>
            <div className='flex gap-3'>
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className='text-xs text-muted-foreground hover:text-foreground transition-colors'
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className='flex gap-2'>
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel='noopener noreferrer'
                className='w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-muted transition-all'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className='h-3.5 w-3.5' />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
