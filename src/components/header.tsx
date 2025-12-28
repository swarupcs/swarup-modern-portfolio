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
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blogs' },
  // { href: '/projects', label: 'Projects' },
];

export default function Header() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md border-b supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto flex h-14 md:h-16 max-w-4xl items-center justify-between px-4 sm:px-6'>
        <Link
          href='/'
          className='font-bold tracking-tight text-base md:text-lg hover:text-primary transition-colors'
        >
          Portfolio
        </Link>

        <nav aria-label='Primary' className='hidden md:flex items-center gap-6'>
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-foreground',
                  active ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        <div className='flex md:hidden items-center gap-2'>
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='md:hidden'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-64'>
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
                        active ? 'text-foreground' : 'text-muted-foreground'
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
