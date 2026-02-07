'use client';

import { useEffect, useState } from 'react';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar from 0 to 100
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    const hideTimer = setTimeout(() => {
      setProgress(100);
      setIsHiding(true);
    }, 2800);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3600);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black via-background to-primary/10 transition-opacity duration-700 ${
        isHiding ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated floating background orbs */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-float' />
        <div
          className='absolute bottom-20 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl animate-float'
          style={{ animationDelay: '1s' }}
        />
        <div className='absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl animate-pulse' />
      </div>

      {/* Content container */}
      <div className='relative z-10 text-center max-w-2xl px-6 w-full'>
        {/* Animated logo/icon */}
        <div className='mb-12 flex justify-center animate-elastic-bounce'>
          <div className='relative w-32 h-32'>
            {/* Outer rotating ring with glow */}
            <div className='absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin-slow glow-primary' />

            {/* Middle ring counter-rotating */}
            <div
              className='absolute inset-3 rounded-full border-2 border-transparent border-b-secondary border-l-secondary animate-spin-slow'
              style={{ animation: 'spin 8s linear infinite reverse' }}
            />

            {/* Inner gradient circle */}
            <div className='absolute inset-8 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 backdrop-blur-sm animate-glow-pulse' />
          </div>
        </div>

        {/* Developer name with letter-by-letter reveal */}
        <div className='mb-4 h-16 flex items-center justify-center overflow-hidden'>
          <h1 className='text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-shift'>
            Swarup Das
          </h1>
        </div>

        {/* Role subtitle */}
        <div
          className='mb-8 animate-slide-up'
          style={{ animationDelay: '400ms' }}
        >
          <p className='text-xl md:text-2xl font-light text-muted-foreground tracking-wide'>
            Full Stack Developer
          </p>
        </div>

        {/* Decorative animated lines */}
        <div
          className='flex items-center justify-center gap-4 mb-12 animate-slide-up'
          style={{ animationDelay: '600ms' }}
        >
          <div className='h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-primary/50' />
          <div className='flex gap-1'>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className='w-1 h-1 rounded-full bg-primary/60'
                style={{
                  animation: `pulse 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 200}ms`,
                }}
              />
            ))}
          </div>
          <div className='h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-primary/50' />
        </div>

        {/* Animated progress bar */}
        <div
          className='mb-8 animate-slide-up'
          style={{ animationDelay: '800ms' }}
        >
          <div className='text-xs text-muted-foreground/60 mb-3 uppercase tracking-widest font-semibold'>
            Loading ({Math.min(Math.floor(progress), 100)}%)
          </div>
          <div className='w-full h-1 bg-muted rounded-full overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 ease-out'
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Tagline */}
        <div className='animate-fade-in' style={{ animationDelay: '1200ms' }}>
          <p className='text-sm text-muted-foreground/40 font-light tracking-wide'>
            Crafting elegant digital experiences with precision
          </p>
        </div>
      </div>
    </div>
  );
}
