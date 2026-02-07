'use client';

import * as React from 'react';
import {
  Search,
  FileText,
  Github,
  Mail,
  Briefcase,
  Code2,
  Home,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  icon: React.ReactNode;
  href: string;
  action?: () => void;
}

const commands: CommandItem[] = [
  {
    id: 'home',
    title: 'Home',
    category: 'Navigation',
    icon: <Home className='h-4 w-4' />,
    href: '/',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'View all my projects',
    category: 'Navigation',
    icon: <Code2 className='h-4 w-4' />,
    href: '#projects',
  },
  {
    id: 'experience',
    title: 'Experience',
    description: 'My work experience',
    category: 'Navigation',
    icon: <Briefcase className='h-4 w-4' />,
    href: '#experience',
  },
  {
    id: 'resume',
    title: 'Resume',
    description: 'Download my resume',
    category: 'Documents',
    icon: <FileText className='h-4 w-4' />,
    href: '/Swarup_Resume.pdf',
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Visit my GitHub profile',
    category: 'Social',
    icon: <Github className='h-4 w-4' />,
    href: 'https://github.com/swarupcs',
  },
  {
    id: 'email',
    title: 'Send Email',
    description: 'Get in touch via email',
    category: 'Contact',
    icon: <Mail className='h-4 w-4' />,
    href: 'mailto:contact@example.com',
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(search.toLowerCase()),
  );

  const groupedCommands = filteredCommands.reduce(
    (acc, cmd) => {
      if (!acc[cmd.category]) {
        acc[cmd.category] = [];
      }
      acc[cmd.category].push(cmd);
      return acc;
    },
    {} as Record<string, CommandItem[]>,
  );

  return (
    <>
      {/* Command Palette Button */}
      <button
        onClick={() => setOpen(true)}
        className='fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:bg-muted hover:border-primary/30 transition-all'
      >
        <Search className='h-4 w-4 text-muted-foreground' />
        <span className='text-sm text-muted-foreground hidden sm:inline'>
          Cmd+K
        </span>
      </button>

      {/* Command Palette Modal */}
      {open && (
        <>
          <div
            className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm'
            onClick={() => setOpen(false)}
          />
          <div className='fixed inset-0 z-50 flex items-start justify-center pt-16'>
            <div className='w-full max-w-xl rounded-lg border border-border bg-card shadow-2xl'>
              {/* Search Input */}
              <div className='border-b border-border p-4 flex items-center gap-3'>
                <Search className='h-5 w-5 text-muted-foreground flex-shrink-0' />
                <input
                  autoFocus
                  type='text'
                  placeholder='Search commands...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground'
                />
                <kbd className='px-2 py-1 text-xs rounded border border-border bg-muted text-muted-foreground'>
                  ESC
                </kbd>
              </div>

              {/* Commands List */}
              <div className='max-h-96 overflow-y-auto'>
                {Object.entries(groupedCommands).length === 0 ? (
                  <div className='p-8 text-center text-muted-foreground'>
                    No commands found
                  </div>
                ) : (
                  Object.entries(groupedCommands).map(([category, cmds]) => (
                    <div key={category}>
                      <div className='px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
                        {category}
                      </div>
                      {cmds.map((cmd) => {
                        const isExternal = cmd.href.startsWith('http');
                        const isDownload = cmd.id === 'resume';

                        // Use <a> tag for downloads and external links
                        if (isDownload || isExternal) {
                          return (
                            <a
                              key={cmd.id}
                              href={cmd.href}
                              onClick={() => {
                                setOpen(false);
                                setSearch('');
                              }}
                              className='flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors cursor-pointer'
                              target={isExternal ? '_blank' : undefined}
                              rel={
                                isExternal ? 'noopener noreferrer' : undefined
                              }
                              download={
                                isDownload ? 'Swarup_Resume.pdf' : undefined
                              }
                            >
                              <div className='text-muted-foreground'>
                                {cmd.icon}
                              </div>
                              <div className='flex-1 min-w-0'>
                                <div className='font-medium text-foreground text-sm'>
                                  {cmd.title}
                                </div>
                                {cmd.description && (
                                  <div className='text-xs text-muted-foreground'>
                                    {cmd.description}
                                  </div>
                                )}
                              </div>
                            </a>
                          );
                        }

                        // Use Link for internal navigation
                        return (
                          <Link
                            key={cmd.id}
                            href={cmd.href}
                            onClick={() => {
                              setOpen(false);
                              setSearch('');
                            }}
                            className='flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors cursor-pointer'
                          >
                            <div className='text-muted-foreground'>
                              {cmd.icon}
                            </div>
                            <div className='flex-1 min-w-0'>
                              <div className='font-medium text-foreground text-sm'>
                                {cmd.title}
                              </div>
                              {cmd.description && (
                                <div className='text-xs text-muted-foreground'>
                                  {cmd.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
