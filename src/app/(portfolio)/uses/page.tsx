'use client';

import { motion } from 'framer-motion';
import { Monitor, Laptop, Keyboard, Mouse, Terminal, Code2, Paintbrush, Chrome, Zap, LucideIcon } from 'lucide-react';
import React from 'react';
import SectionHeading from '@/components/section-heading';

interface UseItem {
  name: string;
  description: string;
  link?: string;
  icon: LucideIcon;
}

interface UseCategory {
  category: string;
  icon: LucideIcon;
  items: UseItem[];
}

const usesData: UseCategory[] = [
  {
    category: 'Hardware & Desk',
    icon: Monitor,
    items: [
      {
        name: 'MacBook Pro 16"',
        description: 'M3 Pro, 32GB RAM. My daily driver for everything development and design.',
        icon: Laptop,
      },
      {
        name: 'LG 27" 4K Monitor',
        description: 'Crystal clear text and colors. Perfect for coding and reading documentation.',
        icon: Monitor,
      },
      {
        name: 'Keychron K3',
        description: 'Low-profile mechanical keyboard with brown switches. Tactile yet quiet enough for calls.',
        icon: Keyboard,
      },
      {
        name: 'Logitech MX Master 3S',
        description: 'The ultimate productivity mouse. The MagSpeed scroll wheel is a game changer.',
        icon: Mouse,
      },
    ],
  },
  {
    category: 'Coding Setup',
    icon: Code2,
    items: [
      {
        name: 'VS Code',
        description: 'My editor of choice. Heavily customized with shortcuts and snippets.',
        icon: Code2,
      },
      {
        name: 'One Dark Pro',
        description: 'My go-to theme. Easy on the eyes for late-night coding sessions.',
        icon: Paintbrush,
      },
      {
        name: 'Warp / iTerm2',
        description: 'Blazing fast terminals. I use Warp for its AI features and iTerm2 for legacy scripting.',
        icon: Terminal,
      },
      {
        name: 'JetBrains Mono',
        description: 'My coding font. The ligatures make reading complex operators a breeze.',
        icon: Code2,
      },
    ],
  },
  {
    category: 'Software & Productivity',
    icon: Zap,
    items: [
      {
        name: 'Arc Browser',
        description: 'Replaced Chrome for me. Spaces and profiles keep my work and personal life separated.',
        icon: Chrome,
      },
      {
        name: 'Notion',
        description: 'My second brain. Used for project management, note-taking, and documentation.',
        icon: Zap,
      },
      {
        name: 'Raycast',
        description: 'A Spotlight replacement on steroids. I use it for clipboard history, window management, and quick conversions.',
        icon: Zap,
      },
      {
        name: 'Figma',
        description: 'For all my design needs, from wireframing to high-fidelity prototypes.',
        icon: Paintbrush,
      },
    ],
  },
];

export default function UsesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className='min-h-screen py-24 md:py-32'>
      <div className='max-w-4xl mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-4 mb-16'
        >
          <SectionHeading title='Uses' description='My Gear & Tools' />
          <p className='text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-center'>
            A curated list of the hardware, software, and productivity tools I use daily to build software and manage my workflow.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='space-y-16'
        >
          {usesData.map((section, idx) => {
            const SectionIcon = section.icon;
            return (
              <motion.section key={idx} variants={itemVariants} className='space-y-6'>
                <div className='flex items-center gap-3 border-b border-border pb-4'>
                  <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary'>
                    <SectionIcon className='w-5 h-5' />
                  </div>
                  <h2 className='text-2xl font-bold tracking-tight'>
                    {section.category}
                  </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {section.items.map((item, itemIdx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={itemIdx}
                        className='group relative p-5 rounded-2xl border border-border bg-card/50 hover:bg-muted/50 transition-all hover:border-border/80'
                      >
                        <div className='flex items-start gap-4'>
                          <div className='mt-1 p-2.5 rounded-lg bg-background border border-border text-muted-foreground group-hover:text-primary transition-colors'>
                            <ItemIcon className='w-5 h-5' />
                          </div>
                          <div className='space-y-1.5'>
                            <h3 className='font-semibold tracking-tight text-foreground'>
                              {item.name}
                            </h3>
                            <p className='text-sm text-muted-foreground leading-relaxed'>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
