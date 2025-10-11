"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { GitBranch, GitCommit, GitPullRequest, Star } from "lucide-react"
import { motion } from "framer-motion"
import SectionHeading from "./section-heading"

interface GithubStats {
  totalContributions: number
  totalRepositories: number
  totalStars: number
  topLanguages: { name: string; percentage: number; color: string }[]
  loading: boolean
  error: string | null
}

export default function GithubStats() {
  const [stats, setStats] = useState<GithubStats>({
    totalContributions: 0,
    totalRepositories: 0,
    totalStars: 0,
    topLanguages: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    // In a real implementation, you would fetch data from GitHub API
    // For demo purposes, we'll simulate loading and then set mock data
    const timer = setTimeout(() => {
      setStats({
        totalContributions: 1247,
        totalRepositories: 32,
        totalStars: 156,
        topLanguages: [
          { name: "JavaScript", percentage: 40, color: "#f1e05a" },
          { name: "TypeScript", percentage: 30, color: "#2b7489" },
          { name: "HTML", percentage: 15, color: "#e34c26" },
          { name: "CSS", percentage: 10, color: "#563d7c" },
          { name: "Python", percentage: 5, color: "#3572A5" },
        ],
        loading: false,
        error: null,
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

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
    <section id="github" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <SectionHeading title="GitHub Stats" description="My open source contributions and coding activity" />
        <motion.div
          className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.loading ? (
                  <Skeleton className="h-10 w-20" />
                ) : (
                  <motion.div
                    className="flex items-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <GitCommit className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{stats.totalContributions.toLocaleString()}</span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Repositories</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.loading ? (
                  <Skeleton className="h-10 w-20" />
                ) : (
                  <motion.div
                    className="flex items-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.1 }}
                  >
                    <GitBranch className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{stats.totalRepositories}</span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Stars Received</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.loading ? (
                  <Skeleton className="h-10 w-20" />
                ) : (
                  <motion.div
                    className="flex items-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.2 }}
                  >
                    <Star className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{stats.totalStars}</span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pull Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.loading ? (
                  <Skeleton className="h-10 w-20" />
                ) : (
                  <motion.div
                    className="flex items-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.3 }}
                  >
                    <GitPullRequest className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">78</span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        <motion.div
          className="mx-auto mt-8 max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Top Languages</CardTitle>
              <CardDescription>Languages I use most frequently</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  <motion.div
                    className="h-4 w-full rounded-full bg-muted"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    {stats.topLanguages.map((lang, index) => (
                      <motion.div
                        key={lang.name}
                        className="h-full rounded-full"
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: lang.color,
                          marginLeft: index === 0 ? 0 : "-4px",
                          display: "inline-block",
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 * index }}
                      />
                    ))}
                  </motion.div>
                  <motion.div
                    className="flex flex-wrap gap-4"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    {stats.topLanguages.map((lang) => (
                      <motion.div key={lang.name} className="flex items-center" variants={item}>
                        <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: lang.color }} />
                        <span className="text-sm">
                          {lang.name} ({lang.percentage}%)
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}
            </CardContent>
          </Card>
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
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              GitHub
            </motion.a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
