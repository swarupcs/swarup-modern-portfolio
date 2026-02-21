'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CheckCircle,
  Trophy,
  Target,
  TrendingUp,
  Flame,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LeetcodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  ranking: number | null;
  contestRating: number | null;
  acceptanceRate?: number;
  activeDays?: number;
  streak?: number;
  badges?: Array<{ name: string; icon: string }>;
  recentSubmissions?: Array<{
    title: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
  }>;
}

export default function LeetcodeStats() {
  const [stats, setStats] = useState<LeetcodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/leetcode?username=swarupdcse')
      .then((r) => {
        if (!r.ok) throw new Error('Failed');
        return r.json();
      })
      .then((data) => {
        setStats(data);
        setError(null);
      })
      .catch(() => setError('Failed to load LeetCode stats'))
      .finally(() => setLoading(false));
  }, []);

  const pct = (solved: number, total: number) =>
    total ? Math.round((solved / total) * 100) : 0;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  const statCards = [
    {
      label: 'Total Solved',
      value: stats ? `${stats.totalSolved} / ${stats.totalQuestions}` : '—',
      icon: Target,
      color: 'text-blue-500',
    },
    {
      label: 'Contest Rating',
      value: stats?.contestRating ?? 'N/A',
      icon: Trophy,
      color: 'text-yellow-500',
    },
    {
      label: 'Global Rank',
      value: stats?.ranking ? `#${stats.ranking.toLocaleString()}` : 'N/A',
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      label: 'Acceptance',
      value: stats?.acceptanceRate ? `${stats.acceptanceRate}%` : 'N/A',
      icon: CheckCircle,
      color: 'text-purple-500',
    },
  ];

  const difficulties = [
    {
      label: 'Easy',
      solved: stats?.easySolved || 0,
      total: stats?.easyTotal || 1,
      color: 'bg-green-500',
    },
    {
      label: 'Medium',
      solved: stats?.mediumSolved || 0,
      total: stats?.mediumTotal || 1,
      color: 'bg-yellow-500',
    },
    {
      label: 'Hard',
      solved: stats?.hardSolved || 0,
      total: stats?.hardTotal || 1,
      color: 'bg-red-500',
    },
  ];

  return (
    <section id='leetcode' className='py-10 md:py-14 scroll-mt-20'>
      <div className='max-w-5xl mx-auto px-6'>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-8'
        >
          <p className='text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-3'>
            Problem Solving
          </p>
          <h2 className='text-3xl md:text-4xl font-black tracking-tight'>
            LeetCode Stats
          </h2>
          <p className='text-muted-foreground text-sm mt-3 max-w-md mx-auto'>
            My problem-solving journey
          </p>
        </motion.div>

        {error ? (
          <p className='text-center text-red-500 text-sm'>{error}</p>
        ) : (
          <>
            {/* Stat cards */}
            <motion.div
              className='grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4'
              variants={container}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
            >
              {statCards.map(({ label, value, icon: Icon, color }) => (
                <motion.div key={label} variants={item}>
                  <Card className='border border-border hover:border-primary/20 transition-colors'>
                    <CardHeader className='pb-1 pt-4 px-4'>
                      <CardTitle className='text-xs font-medium text-muted-foreground flex items-center gap-1.5'>
                        <Icon className={`h-3.5 w-3.5 ${color}`} />
                        {label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='px-4 pb-4'>
                      {loading ? (
                        <Skeleton className='h-8 w-16' />
                      ) : (
                        <span className='text-2xl font-bold'>{value}</span>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Problems by difficulty + activity side by side */}
            <motion.div
              className='grid md:grid-cols-2 gap-4 mb-4'
              variants={container}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
            >
              {/* Difficulty breakdown */}
              <motion.div variants={item}>
                <Card className='border border-border hover:border-primary/20 h-full'>
                  <CardHeader className='pb-2 pt-4 px-4'>
                    <CardTitle className='text-sm font-semibold'>
                      Problems by Difficulty
                    </CardTitle>
                    <CardDescription className='text-xs'>
                      Breakdown of solved problems
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='px-4 pb-4 space-y-4'>
                    {loading ? (
                      <div className='space-y-3'>
                        <Skeleton className='h-4 w-full' />
                        <Skeleton className='h-4 w-full' />
                        <Skeleton className='h-4 w-full' />
                      </div>
                    ) : (
                      <>
                        {difficulties.map(({ label, solved, total, color }) => (
                          <div key={label} className='space-y-1.5'>
                            <div className='flex items-center justify-between text-xs'>
                              <div className='flex items-center gap-1.5'>
                                <div
                                  className={`h-2 w-2 rounded-full ${color}`}
                                />
                                <span className='font-medium'>{label}</span>
                              </div>
                              <span className='text-muted-foreground'>
                                {solved} / {total} ({pct(solved, total)}%)
                              </span>
                            </div>
                            <div className='h-1.5 rounded-full bg-muted overflow-hidden'>
                              <motion.div
                                className={`h-full ${color}`}
                                initial={{ width: 0 }}
                                whileInView={{
                                  width: `${pct(solved, total)}%`,
                                }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, ease: 'easeOut' }}
                              />
                            </div>
                          </div>
                        ))}
                        {/* Overall */}
                        <div className='pt-3 border-t space-y-1.5'>
                          <div className='flex items-center justify-between text-xs'>
                            <span className='font-medium'>Overall</span>
                            <span className='text-muted-foreground'>
                              {pct(
                                stats?.totalSolved || 0,
                                stats?.totalQuestions || 1,
                              )}
                              %
                            </span>
                          </div>
                          <div className='h-2 rounded-full bg-muted overflow-hidden'>
                            <motion.div
                              className='h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500'
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${pct(stats?.totalSolved || 0, stats?.totalQuestions || 1)}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1.1,
                                ease: 'easeOut',
                                delay: 0.2,
                              }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Activity */}
              <motion.div variants={item}>
                <Card className='border border-border hover:border-primary/20 h-full'>
                  <CardHeader className='pb-2 pt-4 px-4'>
                    <CardTitle className='text-sm font-semibold'>
                      Activity
                    </CardTitle>
                    <CardDescription className='text-xs'>
                      Coding consistency
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='px-4 pb-4 space-y-3'>
                    {loading ? (
                      <div className='space-y-3'>
                        <Skeleton className='h-14 w-full' />
                        <Skeleton className='h-14 w-full' />
                      </div>
                    ) : (
                      <>
                        <div className='flex items-center justify-between p-3 rounded-lg bg-muted/50'>
                          <div className='flex items-center gap-2'>
                            <Flame className='h-4 w-4 text-orange-500' />
                            <div>
                              <p className='text-xs font-medium'>
                                Current Streak
                              </p>
                              <p className='text-[10px] text-muted-foreground'>
                                Days in a row
                              </p>
                            </div>
                          </div>
                          <span className='text-xl font-bold text-orange-500'>
                            {stats?.streak ?? '—'}
                          </span>
                        </div>
                        <div className='flex items-center justify-between p-3 rounded-lg bg-muted/50'>
                          <div className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4 text-blue-500' />
                            <div>
                              <p className='text-xs font-medium'>Active Days</p>
                              <p className='text-[10px] text-muted-foreground'>
                                Total days practiced
                              </p>
                            </div>
                          </div>
                          <span className='text-xl font-bold text-blue-500'>
                            {stats?.activeDays ?? '—'}
                          </span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Recent Submissions */}
            {stats?.recentSubmissions && stats.recentSubmissions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className='border border-border hover:border-primary/20'>
                  <CardHeader className='pb-2 pt-4 px-4'>
                    <CardTitle className='text-sm font-semibold'>
                      Recent Submissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='px-4 pb-4 space-y-2'>
                    {stats.recentSubmissions.slice(0, 5).map((sub, i) => (
                      <div
                        key={i}
                        className='flex items-center justify-between p-2.5 rounded-lg border hover:bg-muted/50 transition-colors'
                      >
                        <div className='flex items-center gap-2'>
                          <CheckCircle className='h-3.5 w-3.5 text-green-500 shrink-0' />
                          <div>
                            <p className='text-xs font-medium'>{sub.title}</p>
                            <p className='text-[10px] text-muted-foreground'>
                              {sub.lang} · {sub.timestamp}
                            </p>
                          </div>
                        </div>
                        <span className='text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500 shrink-0'>
                          {sub.statusDisplay}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        )}

        <p className='text-center text-xs text-muted-foreground mt-6'>
          View more on{' '}
          <a
            href='https://leetcode.com/u/swarupdcse'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary hover:underline font-medium'
          >
            LeetCode
          </a>
        </p>
      </div>
    </section>
  );
}
