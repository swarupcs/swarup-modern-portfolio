'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

const THEMES = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
] as const;

interface ThemeSwitcherProps {
  /** 'icon' = single cycling button (default for header use)
   *  'menu' = three-way pill selector */
  variant?: 'icon' | 'menu';
}

export default function ThemeSwitcher({
  variant = 'icon',
}: ThemeSwitcherProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className='w-9 h-9 rounded-xl bg-transparent' />;
  }

  if (variant === 'menu') {
    return (
      <div className='flex items-center gap-1 bg-[#111118] border border-[#1f1f2e] rounded-xl p-1'>
        {THEMES.map(({ value, icon: Icon, label }) => {
          const isActive = theme === value;
          return (
            <button
              key={value}
              onClick={() => setTheme(value)}
              title={label}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-sm'
                  : 'text-[#6b7280] hover:text-white hover:bg-[#1a1a2e]'
              }`}
            >
              <Icon className='w-3.5 h-3.5' />
              <span className='hidden sm:inline'>{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // 'icon' variant — cycles through light → dark → system → light
  const cycle = () => {
    const order = ['light', 'dark', 'system'];
    const current = order.indexOf(theme ?? 'dark');
    setTheme(order[(current + 1) % order.length]);
  };

  const isDark = resolvedTheme === 'dark';
  const isSystem = theme === 'system';

  return (
    <button
      onClick={cycle}
      title={`Theme: ${theme} — click to cycle`}
      className='relative w-9 h-9 flex items-center justify-center rounded-xl border transition-all
        border-[#1f1f2e] bg-[#111118] hover:bg-[#1a1a2e] hover:border-[#2a2a3e]
        dark:border-[#1f1f2e] dark:bg-[#111118] dark:hover:bg-[#1a1a2e]
        light:border-gray-200 light:bg-white light:hover:bg-gray-50
        text-[#6b7280] hover:text-white'
    >
      {isSystem ? (
        <Monitor className='w-4 h-4' />
      ) : isDark ? (
        <Moon className='w-4 h-4' />
      ) : (
        <Sun className='w-4 h-4' />
      )}
      {/* Tiny system indicator dot */}
      {isSystem && (
        <span className='absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-400' />
      )}
    </button>
  );
}
