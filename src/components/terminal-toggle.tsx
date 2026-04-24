'use client';

import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTerminal } from '@/components/terminal-provider';

export function TerminalToggle() {
  const { toggleTerminal, isOpen } = useTerminal();

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={toggleTerminal}
      className={isOpen ? 'bg-white/10 text-primary' : 'hover:bg-white/10'}
      title="Toggle Terminal Mode"
    >
      <Terminal className='h-5 w-5' />
      <span className='sr-only'>Toggle terminal mode</span>
    </Button>
  );
}
