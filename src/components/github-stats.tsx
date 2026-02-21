'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  Star,
  Users,
  Flame,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface GithubStats {
  username: string;
  totalContributions: number;
  totalRepositories: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  pullRequests: number;
  issues: number;
  followers: number;
  following: number;
  currentStreak?: number;
  longestStreak?: number;
  contributionCalendar?: Array<{ date: string; count: number }>;
}

export default function GithubStats() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/github?username=swarupcs')
      .then((r) => {
        if (!r.ok) throw new Error('Failed');
        return r.json();
      })
      .then((data) => {
        setStats(data);
        setError(null);
      })
      .catch(() => setError('Failed to load GitHub stats'))
      .finally(() => setLoading(false));
  }, []);

  const username = stats?.username || 'swarupcs';

  const topStats = [
    {
      label: 'Contributions',
      value: stats?.totalContributions
        ? stats.totalContributions.toLocaleString()
        : 'N/A',
      icon: GitCommit,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      label: 'Repositories',
      value: stats?.totalRepositories ?? 0,
      icon: GitBranch,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Stars',
      value: stats?.totalStars ?? 0,
      icon: Star,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
    {
      label: 'Pull Requests',
      value: stats?.pullRequests || 'N/A',
      icon: GitPullRequest,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  return (
    <section id='github' className='py-10 md:py-14 scroll-mt-20'>
      <div className='max-w-5xl mx-auto px-6'>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-8'
        >
          <p className='text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-3'>
            Open Source
          </p>
          <h2 className='text-3xl md:text-4xl font-black tracking-tight'>
            GitHub Stats
          </h2>
          <p className='text-muted-foreground text-sm mt-3 max-w-md mx-auto'>
            My contributions and coding activity
          </p>
        </motion.div>

        {error ? (
          <p className='text-center text-red-500 text-sm py-8'>{error}</p>
        ) : (
          <div className='space-y-3'>
            {/* Row 1 — Primary stats */}
            <motion.div
              className='grid grid-cols-2 lg:grid-cols-4 gap-3'
              variants={container}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
            >
              {topStats.map(({ label, value, icon: Icon, color, bg }) => (
                <motion.div
                  key={label}
                  variants={item}
                  className='rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-all hover:shadow-sm'
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3`}
                  >
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div className='text-xs text-muted-foreground mb-1'>
                    {label}
                  </div>
                  {loading ? (
                    <Skeleton className='h-7 w-16' />
                  ) : (
                    <div className='text-2xl font-black tracking-tight'>
                      {value}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Row 2 — Streak + Community */}
            <motion.div
              className='grid grid-cols-1 md:grid-cols-2 gap-3'
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              {/* Streak */}
              <div className='rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-all'>
                <div className='flex items-center gap-2 mb-4'>
                  <div className='w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center'>
                    <Flame className='h-3.5 w-3.5 text-orange-500' />
                  </div>
                  <span className='text-sm font-semibold'>
                    Contribution Streak
                  </span>
                </div>
                <div className='flex items-center gap-6'>
                  <div>
                    {loading ? (
                      <Skeleton className='h-9 w-12' />
                    ) : (
                      <div className='text-3xl font-black text-orange-500'>
                        {stats?.currentStreak ?? '—'}
                      </div>
                    )}
                    <div className='text-xs text-muted-foreground mt-0.5'>
                      Current streak
                    </div>
                  </div>
                  <div className='w-px h-10 bg-border' />
                  <div>
                    {loading ? (
                      <Skeleton className='h-9 w-12' />
                    ) : (
                      <div className='text-3xl font-black text-primary'>
                        {stats?.longestStreak ?? '—'}
                      </div>
                    )}
                    <div className='text-xs text-muted-foreground mt-0.5'>
                      Longest streak
                    </div>
                  </div>
                </div>
              </div>

              {/* Community */}
              <div className='rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-all'>
                <div className='flex items-center gap-2 mb-4'>
                  <div className='w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center'>
                    <Users className='h-3.5 w-3.5 text-blue-500' />
                  </div>
                  <span className='text-sm font-semibold'>Community</span>
                </div>
                <div className='flex items-center gap-6'>
                  <div>
                    {loading ? (
                      <Skeleton className='h-9 w-12' />
                    ) : (
                      <div className='text-3xl font-black'>
                        {stats?.followers ?? '—'}
                      </div>
                    )}
                    <div className='text-xs text-muted-foreground mt-0.5'>
                      Followers
                    </div>
                  </div>
                  <div className='w-px h-10 bg-border' />
                  <div>
                    {loading ? (
                      <Skeleton className='h-9 w-12' />
                    ) : (
                      <div className='text-3xl font-black'>
                        {stats?.following ?? '—'}
                      </div>
                    )}
                    <div className='text-xs text-muted-foreground mt-0.5'>
                      Following
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Row 3 — Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className='rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-all'
            >
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <p className='text-sm font-semibold'>Contribution Activity</p>
                  <p className='text-xs text-muted-foreground mt-0.5'>
                    Past year of contributions
                  </p>
                </div>
                {!loading && stats?.totalContributions ? (
                  <span className='text-xs font-medium px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20'>
                    {stats.totalContributions.toLocaleString()} total
                  </span>
                ) : null}
              </div>
              {loading ? (
                <div className='space-y-1.5'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                </div>
              ) : (
                <div className='overflow-x-auto'>
                  <img
                    src={`https://ghchart.rshah.org/${username}`}
                    alt='GitHub Contribution Graph'
                    className='rounded w-full min-w-[600px] opacity-90'
                    loading='lazy'
                  />
                </div>
              )}
            </motion.div>

            {/* Row 4 — Top Languages */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className='rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-all'
            >
              <div className='mb-4'>
                <p className='text-sm font-semibold'>Top Languages</p>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  Most used in my repositories
                </p>
              </div>
              {loading ? (
                <div className='space-y-2'>
                  <Skeleton className='h-2.5 w-full rounded-full' />
                  <Skeleton className='h-3 w-2/3' />
                </div>
              ) : stats?.topLanguages && stats.topLanguages.length > 0 ? (
                <div className='space-y-3'>
                  {/* Segmented bar */}
                  <div className='flex h-2.5 w-full rounded-full overflow-hidden gap-px bg-muted'>
                    {stats.topLanguages.map((lang) => (
                      <motion.div
                        key={lang.name}
                        className='h-full cursor-pointer transition-opacity duration-200'
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: lang.color,
                          opacity:
                            hoveredLang && hoveredLang !== lang.name ? 0.25 : 1,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        onMouseEnter={() => setHoveredLang(lang.name)}
                        onMouseLeave={() => setHoveredLang(null)}
                        title={`${lang.name}: ${lang.percentage}%`}
                      />
                    ))}
                  </div>
                  {/* Legend */}
                  <div className='flex flex-wrap gap-x-4 gap-y-2'>
                    {stats.topLanguages.map((lang) => (
                      <div
                        key={lang.name}
                        className='flex items-center gap-1.5 cursor-pointer'
                        onMouseEnter={() => setHoveredLang(lang.name)}
                        onMouseLeave={() => setHoveredLang(null)}
                      >
                        <div
                          className='h-2.5 w-2.5 rounded-full transition-transform duration-200'
                          style={{
                            backgroundColor: lang.color,
                            transform:
                              hoveredLang === lang.name
                                ? 'scale(1.4)'
                                : 'scale(1)',
                          }}
                        />
                        <span
                          className={`text-xs transition-colors duration-200 ${hoveredLang === lang.name ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}
                        >
                          {lang.name}{' '}
                          <span className='opacity-60'>
                            ({lang.percentage}%)
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <img
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true`}
                  alt='Top Languages'
                  className='mx-auto'
                  loading='lazy'
                />
              )}
            </motion.div>
          </div>
        )}

        <p className='text-center text-xs text-muted-foreground mt-6'>
          View profile on{' '}
          <a
            href={`https://github.com/${username}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary hover:underline font-medium'
          >
            GitHub →
          </a>
        </p>
      </div>
    </section>
  );
}
