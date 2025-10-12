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
import { CheckCircle, Circle, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from './section-heading';

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
  loading: boolean;
  error: string | null;
}

export default function LeetcodeStats() {
  const [stats, setStats] = useState<LeetcodeStats>({
    totalSolved: 0,
    totalQuestions: 0,
    easySolved: 0,
    easyTotal: 0,
    mediumSolved: 0,
    mediumTotal: 0,
    hardSolved: 0,
    hardTotal: 0,
    ranking: null,
    contestRating: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call your own Next.js API route (server-side LeetCode fetch)
        const response = await axios.get('/api/leetcode?username=swarupdcse');

        setStats({
          ...response.data,
          loading: false,
          error: null,
        });
      } catch (error: any) {
        console.error('Error fetching LeetCode stats:', error);
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: 'Failed to load LeetCode stats',
        }));
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
    <section id='leetcode' className='py-16 md:py-24 bg-muted/50'>
      <div className='px-4 md:px-6'>
        <SectionHeading
          title='LeetCode Stats'
          description='My problem-solving journey on LeetCode'
        />

        {stats.error ? (
          <p className='text-center text-red-500 mt-8'>{stats.error}</p>
        ) : (
          <motion.div
            className='mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2'
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
                  <CardTitle>Problems Solved</CardTitle>
                  <CardDescription>
                    Total problems solved on LeetCode
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.loading ? (
                    <div className='space-y-4'>
                      <Skeleton className='h-8 w-full' />
                      <Skeleton className='h-20 w-full' />
                    </div>
                  ) : (
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium'>
                          {stats.totalSolved} / {stats.totalQuestions}
                        </span>
                        <span className='text-sm text-muted-foreground'>
                          {calculatePercentage(
                            stats.totalSolved,
                            stats.totalQuestions
                          )}
                          %
                        </span>
                      </div>
                      <div className='h-2 w-full overflow-hidden rounded-full bg-muted relative'>
                        <motion.div
                          className='h-full bg-gradient-to-r from-blue-500 to-cyan-400'
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${calculatePercentage(
                              stats.totalSolved,
                              stats.totalQuestions
                            )}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>

                      <motion.div
                        className='grid grid-cols-3 gap-4 pt-4'
                        variants={container}
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true }}
                      >
                        <motion.div className='space-y-2' variants={item}>
                          <div className='flex items-center'>
                            <div className='mr-2 h-3 w-3 rounded-full bg-green-500' />
                            <span className='text-sm font-medium'>Easy</span>
                          </div>
                          <p className='text-xl font-bold'>
                            {stats.easySolved} / {stats.easyTotal}
                          </p>
                        </motion.div>

                        <motion.div className='space-y-2' variants={item}>
                          <div className='flex items-center'>
                            <div className='mr-2 h-3 w-3 rounded-full bg-yellow-500' />
                            <span className='text-sm font-medium'>Medium</span>
                          </div>
                          <p className='text-xl font-bold'>
                            {stats.mediumSolved} / {stats.mediumTotal}
                          </p>
                        </motion.div>

                        <motion.div className='space-y-2' variants={item}>
                          <div className='flex items-center'>
                            <div className='mr-2 h-3 w-3 rounded-full bg-red-500' />
                            <span className='text-sm font-medium'>Hard</span>
                          </div>
                          <p className='text-xl font-bold'>
                            {stats.hardSolved} / {stats.hardTotal}
                          </p>
                        </motion.div>
                      </motion.div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contest Stats Card */}
            <motion.div
              variants={item}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Card className='border-2 border-transparent hover:border-primary/20'>
                <CardHeader>
                  <CardTitle>Contest Stats</CardTitle>
                  <CardDescription>
                    Performance in LeetCode contests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.loading ? (
                    <div className='space-y-4'>
                      <Skeleton className='h-8 w-full' />
                      <Skeleton className='h-20 w-full' />
                    </div>
                  ) : (
                    <div className='space-y-6'>
                      <motion.div
                        className='flex items-center justify-between'
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className='flex items-center'>
                          <Trophy className='mr-2 h-5 w-5 text-yellow-500' />
                          <span className='font-medium'>Contest Rating</span>
                        </div>
                        <span className='text-xl font-bold'>
                          {stats.contestRating ?? 'N/A'}
                        </span>
                      </motion.div>

                      <motion.div
                        className='flex items-center justify-between'
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className='flex items-center'>
                          <CheckCircle className='mr-2 h-5 w-5 text-green-500' />
                          <span className='font-medium'>Global Ranking</span>
                        </div>
                        <span className='text-xl font-bold'>
                          {stats.ranking
                            ? stats.ranking.toLocaleString()
                            : 'N/A'}
                        </span>
                      </motion.div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          className='mt-8 text-center'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
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
