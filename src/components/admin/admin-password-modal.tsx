'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';

const ADMIN_PASSWORD = 'admin123';

interface AdminPasswordModalProps {
  isOpen: boolean;
  onSuccess: () => void;
}

export function AdminPasswordModal({
  isOpen,
  onSuccess,
}: AdminPasswordModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (password === ADMIN_PASSWORD) {
      setPassword('');
      onSuccess();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => null}>
      <DialogContent
        className='sm:max-w-md'
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className='space-y-3'>
          <div className='flex items-center justify-center w-12 h-12 mx-auto bg-primary/10 rounded-full'>
            <Lock className='h-6 w-6 text-primary' />
          </div>
          <DialogTitle className='text-center'>
            Admin Access Required
          </DialogTitle>
          <DialogDescription className='text-center'>
            Enter the admin password displayed below to access the admin
            dashboard
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Password Input */}
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              autoFocus
              className={error ? 'border-destructive' : ''}
            />
            {error && (
              <p className='text-sm text-destructive font-medium'>{error}</p>
            )}
          </div>

          {/* Password Reference Box */}
          <div className='bg-primary/5 p-4 rounded-lg space-y-3 border-2 border-primary/20'>
            <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
              Password Reference
            </p>
            <div className='flex items-center gap-2 bg-background rounded-md p-3 border border-border'>
              <code className='flex-1 text-sm font-mono text-foreground font-bold select-all'>
                {ADMIN_PASSWORD}
              </code>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => setShowPassword(!showPassword)}
                className='flex-shrink-0'
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? 'Verifying...' : 'Unlock Admin Panel'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
