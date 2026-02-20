'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit' | 'done'>('enter');

  useEffect(() => {
    // enter → hold → exit → done
    const t1 = setTimeout(() => setPhase('hold'), 800);
    const t2 = setTimeout(() => setPhase('exit'), 2200);
    const t3 = setTimeout(() => setPhase('done'), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-700 ease-in-out ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ background: '#030309' }}
    >
      {/* Animated background grid */}
      <div
        className='absolute inset-0 opacity-[0.04]'
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow behind logo */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Orbiting ring */}
      <div
        className='absolute w-64 h-64 rounded-full border border-white/5'
        style={{
          animation: 'spin 8s linear infinite',
          background:
            'conic-gradient(from 0deg, transparent 70%, rgba(99,102,241,0.3) 100%)',
        }}
      />
      <div
        className='absolute w-80 h-80 rounded-full border border-white/[0.03]'
        style={{
          animation: 'spin 12s linear infinite reverse',
          background:
            'conic-gradient(from 180deg, transparent 70%, rgba(6,182,212,0.2) 100%)',
        }}
      />

      {/* Main content */}
      <div className='relative flex flex-col items-center gap-6 select-none'>
        {/* Logo mark */}
        <div
          className={`transition-all duration-700 ease-out ${
            phase === 'enter'
              ? 'opacity-0 scale-75 translate-y-4'
              : 'opacity-100 scale-100 translate-y-0'
          }`}
        >
          <div
            className='w-20 h-20 rounded-2xl flex items-center justify-center relative'
            style={{
              background:
                'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              boxShadow:
                '0 0 60px rgba(99,102,241,0.5), 0 0 120px rgba(6,182,212,0.2)',
            }}
          >
            <span
              className='text-white font-black text-2xl tracking-tight'
              style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.05em' }}
            >
              SD
            </span>
            {/* Shine overlay */}
            <div
              className='absolute inset-0 rounded-2xl'
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%)',
              }}
            />
          </div>
        </div>

        {/* Name */}
        <div
          className={`text-center transition-all duration-700 delay-150 ease-out ${
            phase === 'enter'
              ? 'opacity-0 translate-y-3'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <h1
            className='text-4xl font-bold tracking-tight text-white'
            style={{ letterSpacing: '-0.04em' }}
          >
            Swarup Das
          </h1>
          <p
            className='text-sm mt-1 tracking-[0.25em] uppercase'
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Full‑Stack Developer
          </p>
        </div>

        {/* Loading bar */}
        <div
          className={`transition-all duration-700 delay-300 ease-out ${
            phase === 'enter' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div
            className='w-40 h-px rounded-full overflow-hidden'
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className='h-full rounded-full'
              style={{
                background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
                animation: 'loadbar 1.8s ease-out forwards',
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes loadbar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}