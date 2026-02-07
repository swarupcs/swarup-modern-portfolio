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
  GitBranch,
  GitCommit,
  GitPullRequest,
  Star,
  Flame,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from './section-heading';

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
  contributionCalendar?: Array<{
    date: string;
    count: number;
  }>;
}

export default function GithubStats() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/github?username=swarupcs');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        setStats(data);
        setLoading(false);
        setError(null);
      } catch (err: unknown) {
        console.error('Error fetching GitHub stats:', err);
        setLoading(false);
        setError('Failed to load GitHub stats');
      }
    };

    fetchData();
  }, []);

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-muted';
    if (count < 3) return 'bg-green-200 dark:bg-green-900';
    if (count < 6) return 'bg-green-300 dark:bg-green-700';
    if (count < 9) return 'bg-green-400 dark:bg-green-600';
    return 'bg-green-500 dark:bg-green-500';
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const username = stats?.username || 'swarupcs';

  return (
    <section id='github' className='py-16 md:py-24'>
      <div className='px-4 md:px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>
            GitHub Stats
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            My open source contributions and coding activity
          </p>
        </div>

        {error ? (
          <p className='text-center text-red-500 mt-8'>{error}</p>
        ) : (
          <>
            <motion.div
              className='mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4'
              variants={container}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
            >
              <motion.div variants={item}>
                <Card className='border-2 border-transparent hover:border-primary/20 transition-colors'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Contributions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className='h-10 w-20' />
                    ) : (
                      <motion.div
                        className='flex items-center'
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 10,
                        }}
                      >
                        <GitCommit className='mr-2 h-5 w-5 text-muted-foreground' />
                        <span className='text-2xl font-bold'>
                          {stats && stats.totalContributions > 0
                            ? stats.totalContributions.toLocaleString()
                            : 'N/A'}
                        </span>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className='border-2 border-transparent hover:border-primary/20 transition-colors'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Repositories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className='h-10 w-20' />
                    ) : (
                      <motion.div
                        className='flex items-center'
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 10,
                          delay: 0.1,
                        }}
                      >
                        <GitBranch className='mr-2 h-5 w-5 text-muted-foreground' />
                        <span className='text-2xl font-bold'>
                          {stats?.totalRepositories || 0}
                        </span>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className='border-2 border-transparent hover:border-primary/20 transition-colors'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Stars Received
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className='h-10 w-20' />
                    ) : (
                      <motion.div
                        className='flex items-center'
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 10,
                          delay: 0.2,
                        }}
                      >
                        <Star className='mr-2 h-5 w-5 text-muted-foreground' />
                        <span className='text-2xl font-bold'>
                          {stats?.totalStars || 0}
                        </span>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className='border-2 border-transparent hover:border-primary/20 transition-colors'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Pull Requests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className='h-10 w-20' />
                    ) : (
                      <motion.div
                        className='flex items-center'
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 10,
                          delay: 0.3,
                        }}
                      >
                        <GitPullRequest className='mr-2 h-5 w-5 text-muted-foreground' />
                        <span className='text-2xl font-bold'>
                          {stats && stats.pullRequests > 0
                            ? stats.pullRequests
                            : 'N/A'}
                        </span>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* GitHub Streak Card */}
            <motion.div
              className='mx-auto mt-8 max-w-5xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className='border-2 border-transparent hover:border-primary/20 transition-colors'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Flame className='h-5 w-5 text-orange-500' />
                    Contribution Streak
                  </CardTitle>
                  <CardDescription>
                    Keep the momentum going with daily contributions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className='flex gap-8 justify-center'>
                      <Skeleton className='h-20 w-32' />
                      <Skeleton className='h-20 w-32' />
                    </div>
                  ) : stats?.currentStreak !== undefined ||
                    stats?.longestStreak !== undefined ? (
                    <div className='flex flex-wrap gap-8 justify-center'>
                      <motion.div
                        className='text-center'
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className='text-4xl font-bold text-orange-500 mb-2'>
                          {stats?.currentStreak || 0}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          Current Streak
                        </div>
                      </motion.div>
                      <motion.div
                        className='text-center'
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className='text-4xl font-bold text-primary mb-2'>
                          {stats?.longestStreak || 0}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          Longest Streak
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className='text-center py-4'>
                      <img
                        src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent&hide_border=true`}
                        alt='GitHub Streak Stats'
                        className='mx-auto'
                        loading='lazy'
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contribution Heatmap */}
            <motion.div
              className='mx-auto mt-8 max-w-5xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className='border-2 border-transparent hover:border-primary/20 transition-colors'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Calendar className='h-5 w-5' />
                    Contribution Activity
                  </CardTitle>
                  <CardDescription>
                    Your coding activity over the past year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-full' />
                    </div>
                  ) : stats?.contributionCalendar &&
                    stats.contributionCalendar.length > 0 ? (
                    <div className='overflow-x-auto'>
                      <div className='inline-flex gap-1 min-w-full pb-4'>
                        {stats.contributionCalendar
                          .slice(-365)
                          .map((day, index) => (
                            <motion.div
                              key={index}
                              className={`w-3 h-3 rounded-sm ${getContributionColor(
                                day.count
                              )} hover:ring-2 hover:ring-primary transition-all cursor-pointer`}
                              title={`${day.date}: ${day.count} contributions`}
                              initial={{ scale: 0, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.2,
                                delay: index * 0.001,
                              }}
                              whileHover={{ scale: 1.3 }}
                            />
                          ))}
                      </div>
                      <div className='flex items-center gap-2 mt-4 text-xs text-muted-foreground'>
                        <span>Less</span>
                        <div className='flex gap-1'>
                          <div className='w-3 h-3 rounded-sm bg-muted' />
                          <div className='w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900' />
                          <div className='w-3 h-3 rounded-sm bg-green-300 dark:bg-green-700' />
                          <div className='w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600' />
                          <div className='w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500' />
                        </div>
                        <span>More</span>
                      </div>
                    </div>
                  ) : (
                    <div className='text-center py-4'>
                      <img
                        src={`https://ghchart.rshah.org/${username}`}
                        alt='GitHub Contribution Graph'
                        className='mx-auto rounded-lg w-full'
                        loading='lazy'
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className='mx-auto mt-8 max-w-5xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className='border-2 border-transparent hover:border-primary/20 transition-colors'>
                <CardHeader>
                  <CardTitle>Top Languages</CardTitle>
                  <CardDescription>
                    Languages I use most frequently in my repositories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-full' />
                    </div>
                  ) : stats?.topLanguages && stats.topLanguages.length > 0 ? (
                    <div className='space-y-4'>
                      <motion.div
                        className='flex h-4 w-full rounded-full bg-muted overflow-hidden'
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                      >
                        {stats.topLanguages.map((lang, index) => (
                          <motion.div
                            key={lang.name}
                            className='h-full'
                            style={{
                              width: `${lang.percentage}%`,
                              backgroundColor: lang.color,
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 * index }}
                          />
                        ))}
                      </motion.div>
                      <motion.div
                        className='flex flex-wrap gap-4'
                        variants={container}
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true }}
                      >
                        {stats.topLanguages.map((lang) => (
                          <motion.div
                            key={lang.name}
                            className='flex items-center'
                            variants={item}
                          >
                            <div
                              className='mr-2 h-3 w-3 rounded-full'
                              style={{ backgroundColor: lang.color }}
                            />
                            <span className='text-sm'>
                              {lang.name} ({lang.percentage}%)
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  ) : (
                    <div className='text-center py-4'>
                      <img
                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true`}
                        alt='Top Languages'
                        className='mx-auto'
                        loading='lazy'
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}

        <motion.div
          className='mt-8 text-center'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {stats?.totalContributions === 0 && !loading && !error && (
            <p className='text-xs text-muted-foreground mb-2'>
              Note: Add GITHUB_TOKEN to .env.local for full contribution data
            </p>
          )}
          <p className='text-sm text-muted-foreground'>
            View more on{' '}
            <motion.a
              href={`https://github.com/${username}`}
              target='_blank'
              rel='noopener noreferrer'
              className='font-medium text-primary hover:underline'
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              GitHub
            </motion.a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
