'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant='ghost'
        size='icon'
        className='h-9 w-9 rounded-full hover:bg-primary/10 transition-colors'
      >
        <Sun className='h-5 w-5 text-foreground' />
      </Button>
    );
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      className='h-9 w-9 rounded-full hover:bg-primary/10 transition-all'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Moon className='h-5 w-5 text-foreground transition-all dark:rotate-0 dark:scale-100' />
      ) : (
        <Sun className='h-5 w-5 text-foreground transition-all rotate-0 scale-100' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
