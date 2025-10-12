'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { GitBranch, GitCommit, GitPullRequest, Star } from 'lucide-react';
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
  loading: boolean;
  error: string | null;
}

export default function GithubStats() {
  const [stats, setStats] = useState<GithubStats>({
    username: '',
    totalContributions: 0,
    totalRepositories: 0,
    totalStars: 0,
    totalForks: 0,
    topLanguages: [],
    pullRequests: 0,
    issues: 0,
    followers: 0,
    following: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'yourusername' with your actual GitHub username
        const response = await axios.get('/api/github?username=swarupcs');

        setStats({
          ...response.data,
          loading: false,
          error: null,
        });
      } catch (error: any) {
        console.error('Error fetching GitHub stats:', error);
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: 'Failed to load GitHub stats',
        }));
      }
    };

    fetchData();
  }, []);

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

  return (
    <section id='github' className='py-16 md:py-24'>
      <div className='px-4 md:px-6'>
        <SectionHeading
          title='GitHub Stats'
          description='My open source contributions and coding activity'
        />

        {stats.error ? (
          <p className='text-center text-red-500 mt-8'>{stats.error}</p>
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
                    {stats.loading ? (
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
                          {stats.totalContributions > 0
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
                    {stats.loading ? (
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
                          {stats.totalRepositories}
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
                    {stats.loading ? (
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
                          {stats.totalStars}
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
                    {stats.loading ? (
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
                          {stats.pullRequests > 0 ? stats.pullRequests : 'N/A'}
                        </span>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              className='mx-auto mt-8 max-w-5xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className='border-2 border-transparent hover:border-primary/20 transition-colors'>
                <CardHeader>
                  <CardTitle>Top Languages</CardTitle>
                  <CardDescription>
                    Languages I use most frequently in my repositories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.loading ? (
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-full' />
                    </div>
                  ) : stats.topLanguages.length > 0 ? (
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
                    <p className='text-sm text-muted-foreground'>
                      No language data available
                    </p>
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
          {stats.totalContributions === 0 && !stats.loading && !stats.error && (
            <p className='text-xs text-muted-foreground mb-2'>
              Note: Add GITHUB_TOKEN to .env.local for contribution data
            </p>
          )}
          <p className='text-sm text-muted-foreground'>
            View more on{' '}
            <motion.a
              href='https://github.com/swarupcs'
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
