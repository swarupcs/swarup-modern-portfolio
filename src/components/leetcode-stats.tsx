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
  Calendar,
  Flame,
  Award,
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
  recentSubmissions?: Array<{
    title: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
  }>;
  badges?: Array<{
    name: string;
    icon: string;
  }>;
  activeDays?: number;
  streak?: number;
}

export default function LeetcodeStats() {
  const [stats, setStats] = useState<LeetcodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/leetcode?username=swarupdcse');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        setStats(data);
        setLoading(false);
        setError(null);
      } catch (err: unknown) {
        console.error('Error fetching LeetCode stats:', err);
        setLoading(false);
        setError('Failed to load LeetCode stats');
      }
    };

    fetchData();
  }, []);

  const calculatePercentage = (solved: number, total: number) => {
    return total ? Math.round((solved / total) * 100) : 0;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id='leetcode' className='py-16 md:py-24'>
      <div className='px-4 md:px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>
            LeetCode Stats
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            My problem-solving journey on LeetCode
          </p>
        </div>

        {error ? (
          <p className='text-center text-red-500 mt-8'>{error}</p>
        ) : (
          <>
            {/* Top Stats Grid */}
            <motion.div
              className='mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-4'
              variants={container}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
            >
              <motion.div variants={item}>
                <Card className='border-2 border-transparent hover:border-primary/20 transition-colors'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium flex items-center gap-2'>
                      <Target className='h-4 w-4 text-blue-500' />
                      Total Solved
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className='h-10 w-20' />
                    ) : (
                      <motion.div
                        className='text-3xl font-bold'
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 10,
                        }}
                      >
                        {stats?.totalSolved || 0}
                        <span className='text-sm text-muted-foreground ml-1'>
                          / {stats?.totalQuestions || 0}
                        </span>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className='border-2 border-transparent hover:border-primary/20 transition-colors'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium flex items-center gap-2'>
                      <Trophy className='h-4 w-4 text-yellow-500' />
                      Contest Rating
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className='h-10 w-20' />
                    ) : (
                      <motion.div
                        className='text-3xl font-bold'
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 10,
                          delay: 0.1,
                        }}
                      >
                        {stats?.contestRating ?? 'N/A'}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className='border-2 border-transparent hover:border-primary/20 transition-colors'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium flex items-center gap-2'>
                      <TrendingUp className='h-4 w-4 text-green-500' />
                      Global Rank
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className='h-10 w-20' />
                    ) : (
                      <motion.div
                        className='text-3xl font-bold'
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 10,
                          delay: 0.2,
                        }}
                      >
                        {stats?.ranking
                          ? `#${stats.ranking.toLocaleString()}`
                          : 'N/A'}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className='border-2 border-transparent hover:border-primary/20 transition-colors'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium flex items-center gap-2'>
                      <CheckCircle className='h-4 w-4 text-purple-500' />
                      Acceptance Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className='h-10 w-20' />
                    ) : (
                      <motion.div
                        className='text-3xl font-bold'
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 10,
                          delay: 0.3,
                        }}
                      >
                        {stats?.acceptanceRate
                          ? `${stats.acceptanceRate}%`
                          : 'N/A'}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Main Stats Grid */}
            <motion.div
              className='mx-auto mt-6 grid max-w-5xl gap-6 md:grid-cols-2'
              variants={container}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
            >
              {/* Problems Solved Card */}
              <motion.div
                variants={item}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Card className='border-2 border-transparent hover:border-primary/20'>
                  <CardHeader>
                    <CardTitle>Problems by Difficulty</CardTitle>
                    <CardDescription>
                      Breakdown of solved problems
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className='space-y-4'>
                        <Skeleton className='h-8 w-full' />
                        <Skeleton className='h-20 w-full' />
                      </div>
                    ) : (
                      <div className='space-y-6'>
                        {/* Easy */}
                        <div className='space-y-2'>
                          <div className='flex items-center justify-between text-sm'>
                            <div className='flex items-center gap-2'>
                              <div className='h-3 w-3 rounded-full bg-green-500' />
                              <span className='font-medium'>Easy</span>
                            </div>
                            <span className='text-muted-foreground'>
                              {stats?.easySolved} / {stats?.easyTotal} (
                              {calculatePercentage(
                                stats?.easySolved || 0,
                                stats?.easyTotal || 1,
                              )}
                              %)
                            </span>
                          </div>
                          <div className='h-2 overflow-hidden rounded-full bg-muted'>
                            <motion.div
                              className='h-full bg-green-500'
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${calculatePercentage(
                                  stats?.easySolved || 0,
                                  stats?.easyTotal || 1,
                                )}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                            />
                          </div>
                        </div>

                        {/* Medium */}
                        <div className='space-y-2'>
                          <div className='flex items-center justify-between text-sm'>
                            <div className='flex items-center gap-2'>
                              <div className='h-3 w-3 rounded-full bg-yellow-500' />
                              <span className='font-medium'>Medium</span>
                            </div>
                            <span className='text-muted-foreground'>
                              {stats?.mediumSolved} / {stats?.mediumTotal} (
                              {calculatePercentage(
                                stats?.mediumSolved || 0,
                                stats?.mediumTotal || 1,
                              )}
                              %)
                            </span>
                          </div>
                          <div className='h-2 overflow-hidden rounded-full bg-muted'>
                            <motion.div
                              className='h-full bg-yellow-500'
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${calculatePercentage(
                                  stats?.mediumSolved || 0,
                                  stats?.mediumTotal || 1,
                                )}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                ease: 'easeOut',
                                delay: 0.1,
                              }}
                            />
                          </div>
                        </div>

                        {/* Hard */}
                        <div className='space-y-2'>
                          <div className='flex items-center justify-between text-sm'>
                            <div className='flex items-center gap-2'>
                              <div className='h-3 w-3 rounded-full bg-red-500' />
                              <span className='font-medium'>Hard</span>
                            </div>
                            <span className='text-muted-foreground'>
                              {stats?.hardSolved} / {stats?.hardTotal} (
                              {calculatePercentage(
                                stats?.hardSolved || 0,
                                stats?.hardTotal || 1,
                              )}
                              %)
                            </span>
                          </div>
                          <div className='h-2 overflow-hidden rounded-full bg-muted'>
                            <motion.div
                              className='h-full bg-red-500'
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${calculatePercentage(
                                  stats?.hardSolved || 0,
                                  stats?.hardTotal || 1,
                                )}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                ease: 'easeOut',
                                delay: 0.2,
                              }}
                            />
                          </div>
                        </div>

                        {/* Overall Progress */}
                        <div className='pt-4 border-t'>
                          <div className='flex items-center justify-between text-sm mb-2'>
                            <span className='font-medium'>
                              Overall Progress
                            </span>
                            <span className='text-muted-foreground'>
                              {calculatePercentage(
                                stats?.totalSolved || 0,
                                stats?.totalQuestions || 1,
                              )}
                              %
                            </span>
                          </div>
                          <div className='h-3 overflow-hidden rounded-full bg-muted'>
                            <motion.div
                              className='h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500'
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${calculatePercentage(
                                  stats?.totalSolved || 0,
                                  stats?.totalQuestions || 1,
                                )}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1.2,
                                ease: 'easeOut',
                                delay: 0.3,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Activity & Streak Card */}
              <motion.div
                variants={item}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Card className='border-2 border-transparent hover:border-primary/20'>
                  <CardHeader>
                    <CardTitle>Activity & Achievements</CardTitle>
                    <CardDescription>
                      Your coding consistency and milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className='space-y-4'>
                        <Skeleton className='h-8 w-full' />
                        <Skeleton className='h-20 w-full' />
                      </div>
                    ) : (
                      <div className='space-y-6'>
                        <motion.div
                          className='flex items-center justify-between p-4 rounded-lg bg-muted/50'
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className='flex items-center gap-3'>
                            <Flame className='h-5 w-5 text-orange-500' />
                            <div>
                              <p className='text-sm font-medium'>
                                Current Streak
                              </p>
                              <p className='text-xs text-muted-foreground'>
                                Days in a row
                              </p>
                            </div>
                          </div>
                          <span className='text-2xl font-bold text-orange-500'>
                            {stats?.streak ?? 0}
                          </span>
                        </motion.div>

                        <motion.div
                          className='flex items-center justify-between p-4 rounded-lg bg-muted/50'
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className='flex items-center gap-3'>
                            <Calendar className='h-5 w-5 text-blue-500' />
                            <div>
                              <p className='text-sm font-medium'>Active Days</p>
                              <p className='text-xs text-muted-foreground'>
                                Total days practiced
                              </p>
                            </div>
                          </div>
                          <span className='text-2xl font-bold text-blue-500'>
                            {stats?.activeDays ?? 0}
                          </span>
                        </motion.div>

                        {stats?.badges && stats.badges.length > 0 && (
                          <motion.div
                            className='space-y-3'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className='flex items-center gap-2'>
                              <Award className='h-4 w-4 text-yellow-500' />
                              <span className='text-sm font-medium'>
                                Recent Badges
                              </span>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                              {stats.badges.slice(0, 4).map((badge, index) => (
                                <motion.div
                                  key={index}
                                  className='px-3 py-1.5 rounded-full bg-primary/10 text-xs font-medium'
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.4 + index * 0.1 }}
                                  whileHover={{ scale: 1.1 }}
                                >
                                  {badge.icon} {badge.name}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Recent Submissions */}
            {stats?.recentSubmissions && stats.recentSubmissions.length > 0 && (
              <motion.div
                className='mx-auto mt-6 max-w-5xl'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Card className='border-2 border-transparent hover:border-primary/20'>
                  <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                    <CardDescription>
                      Your latest problem-solving activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {stats.recentSubmissions
                        .slice(0, 5)
                        .map((submission, index) => (
                          <motion.div
                            key={index}
                            className='flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors'
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <div className='flex items-center gap-3'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <div>
                                <p className='text-sm font-medium'>
                                  {submission.title}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                  {submission.lang} • {submission.timestamp}
                                </p>
                              </div>
                            </div>
                            <span className='text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500'>
                              {submission.statusDisplay}
                            </span>
                          </motion.div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        )}

        <motion.div
          className='mt-8 text-center'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className='text-sm text-muted-foreground'>
            View more on{' '}
            <motion.a
              href='https://leetcode.com/u/swarupdcse'
              target='_blank'
              rel='noopener noreferrer'
              className='font-medium text-primary hover:underline'
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              LeetCode
            </motion.a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
