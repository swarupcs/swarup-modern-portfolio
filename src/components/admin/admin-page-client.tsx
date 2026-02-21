'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, User, ArrowRight } from 'lucide-react';

export default function AdminPageClient() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // Cookie is set server-side — just redirect
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden'>
      {/* Background grid */}
      <div
        className='absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow orbs */}
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none' />

      <div className='relative w-full max-w-md mx-4'>
        {/* Header */}
        <div className='mb-10 text-center'>
          <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 mb-4 shadow-lg shadow-violet-500/20'>
            <Lock className='w-6 h-6 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-white tracking-tight'>
            Admin Panel
          </h1>
          <p className='text-[#6b7280] mt-1 text-sm'>
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Card */}
        <div className='bg-[#111118] border border-[#1f1f2e] rounded-2xl p-8 shadow-2xl'>
          <form onSubmit={handleLogin} className='space-y-5'>
            {/* Username */}
            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-[#9ca3af] uppercase tracking-widest'>
                Username
              </label>
              <div className='relative'>
                <User className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
                <input
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='w-full bg-[#0d0d14] border border-[#1f1f2e] rounded-xl pl-10 pr-4 py-3 text-white placeholder-[#374151] focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm'
                  placeholder='Enter username'
                  required
                  autoComplete='username'
                />
              </div>
            </div>

            {/* Password */}
            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-[#9ca3af] uppercase tracking-widest'>
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full bg-[#0d0d14] border border-[#1f1f2e] rounded-xl pl-10 pr-12 py-3 text-white placeholder-[#374151] focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm'
                  placeholder='Enter password'
                  required
                  autoComplete='current-password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4b5563] hover:text-[#9ca3af] transition-colors'
                >
                  {showPassword ? (
                    <EyeOff className='w-4 h-4' />
                  ) : (
                    <Eye className='w-4 h-4' />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className='bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm'>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 mt-2'
            >
              {loading ? (
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
              ) : (
                <>
                  Sign In
                  <ArrowRight className='w-4 h-4' />
                </>
              )}
            </button>
          </form>
        </div>

        <p className='text-center text-[#374151] text-xs mt-6'>
          Portfolio Admin • Secure Access
        </p>
      </div>
    </div>
  );
}
