"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle, Circle, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import SectionHeading from "./section-heading"

interface LeetcodeStats {
  totalSolved: number
  totalQuestions: number
  easySolved: number
  easyTotal: number
  mediumSolved: number
  mediumTotal: number
  hardSolved: number
  hardTotal: number
  ranking: number
  contestRating: number
  loading: boolean
  error: string | null
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
    ranking: 0,
    contestRating: 0,
    loading: true,
    error: null,
  })

  useEffect(() => {
    // In a real implementation, you would fetch data from LeetCode API
    // For demo purposes, we'll simulate loading and then set mock data
    const timer = setTimeout(() => {
      setStats({
        totalSolved: 387,
        totalQuestions: 2500,
        easySolved: 180,
        easyTotal: 600,
        mediumSolved: 175,
        mediumTotal: 1300,
        hardSolved: 32,
        hardTotal: 600,
        ranking: 45678,
        contestRating: 1842,
        loading: false,
        error: null,
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const calculatePercentage = (solved: number, total: number) => {
    return Math.round((solved / total) * 100)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="leetcode" className="py-16 md:py-24 bg-muted/50">
      <div className="px-4 md:px-6">
        <SectionHeading title="LeetCode Stats" description="My problem-solving journey on LeetCode" />
        <motion.div
          className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card className="border-2 border-transparent hover:border-primary/20">
              <CardHeader>
                <CardTitle>Problems Solved</CardTitle>
                <CardDescription>Total problems solved on LeetCode</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {stats.totalSolved} / {stats.totalQuestions}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {calculatePercentage(stats.totalSolved, stats.totalQuestions)}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted relative skill-progress-bar">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${calculatePercentage(stats.totalSolved, stats.totalQuestions)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <motion.div
                      className="grid grid-cols-3 gap-4 pt-4"
                      variants={container}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      <motion.div className="space-y-2" variants={item}>
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-green-500" />
                          <span className="text-sm font-medium">Easy</span>
                        </div>
                        <p className="text-xl font-bold">
                          {stats.easySolved} / {stats.easyTotal}
                        </p>
                      </motion.div>
                      <motion.div className="space-y-2" variants={item}>
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500" />
                          <span className="text-sm font-medium">Medium</span>
                        </div>
                        <p className="text-xl font-bold">
                          {stats.mediumSolved} / {stats.mediumTotal}
                        </p>
                      </motion.div>
                      <motion.div className="space-y-2" variants={item}>
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-red-500" />
                          <span className="text-sm font-medium">Hard</span>
                        </div>
                        <p className="text-xl font-bold">
                          {stats.hardSolved} / {stats.hardTotal}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card className="border-2 border-transparent hover:border-primary/20">
              <CardHeader>
                <CardTitle>Contest Stats</CardTitle>
                <CardDescription>Performance in LeetCode contests</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center">
                        <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                        <span className="font-medium">Contest Rating</span>
                      </div>
                      <span className="text-xl font-bold">{stats.contestRating}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="font-medium">Global Ranking</span>
                      </div>
                      <span className="text-xl font-bold">{stats.ranking.toLocaleString()}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center">
                        <Circle className="mr-2 h-5 w-5 text-blue-500" />
                        <span className="font-medium">Contests Attended</span>
                      </div>
                      <span className="text-xl font-bold">24</span>
                    </motion.div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-sm text-muted-foreground">
            View more on{" "}
            <motion.a
              href="https://leetcode.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              LeetCode
            </motion.a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
