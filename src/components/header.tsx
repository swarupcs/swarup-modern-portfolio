'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const nav = [
  // { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blogs' },
  { href: '/projects', label: 'Projects' },
];

export default function Header() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);

  return (
    <header className='fixed inset-x-0 top-0 z-50 glass-morphism border-b border-white/10 supports-[backdrop-filter]:bg-black/20'>
      <div className='mx-auto flex h-16 md:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Logo with hover animation */}
        <Link
          href='/'
          className='group flex items-center gap-2 font-bold tracking-tight text-base md:text-lg hover:text-primary transition-all duration-300 hover:scale-110'
        >
          <div className='w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-black text-xs group-hover:shadow-lg group-hover:shadow-primary/50 transition-all'>
            SD
          </div>
          <span className='hidden sm:inline'>Swarup</span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label='Primary' className='hidden md:flex items-center gap-1'>
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                  active
                    ? 'text-primary bg-primary/10 border border-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent hover:border-white/10',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className='flex items-center gap-3'>
          <div className='hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-white/20 transition-all'>
            <kbd className='text-xs font-semibold text-muted-foreground'>
              ⌘K
            </kbd>
          </div>
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='md:hidden hover:bg-white/10'
              >
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-64 glass-morphism border-l border-white/10'
            >
              <nav className='flex flex-col gap-4 mt-8'>
                {nav.map((item) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'text-base font-medium transition-colors hover:text-foreground py-2',
                        active ? 'text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
