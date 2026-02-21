'use client';

import { useEffect, useState, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  Star,
  Users,
  Flame,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContributionDay {
  date: string;
  count: number;
}

type GridDay = ContributionDay | null; // null = empty padding slot

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
  activeDays?: number;
  contributionCalendar?: ContributionDay[];
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  date: string;
  count: number;
}

// ─── Heatmap Helpers ──────────────────────────────────────────────────────────

/**
 * Build a 2D grid: columns = weeks (left→right), rows = weekdays (top=Sun, bottom=Sat).
 * Each column is always exactly 7 slots. null = padding cell (no data).
 */
function buildGrid(days: ContributionDay[]): GridDay[][] {
  if (!days.length) return [];

  // Ensure data ends at today — pad with zero-count days if needed
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const lastDay = days[days.length - 1];

  if (lastDay.date < todayStr) {
    const d = new Date(lastDay.date + 'T00:00:00');
    d.setDate(d.getDate() + 1);
    while (d.toISOString().split('T')[0] <= todayStr) {
      days.push({ date: d.toISOString().split('T')[0], count: 0 });
      d.setDate(d.getDate() + 1);
    }
  }

  // Pad start so first day lands on correct weekday row (0=Sun)
  const firstDow = new Date(days[0].date + 'T00:00:00').getDay();
  const padded: GridDay[] = [...Array(firstDow).fill(null), ...days];

  // Pad end to multiple of 7
  while (padded.length % 7 !== 0) padded.push(null);

  // Chunk into week columns
  const weeks: GridDay[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  // Remove leading/trailing fully-empty weeks
  while (weeks.length && weeks[0].every((d) => d === null)) weeks.shift();
  while (weeks.length && weeks[weeks.length - 1].every((d) => d === null))
    weeks.pop();

  return weeks;
}

/**
 * Compute dynamic intensity level 0–4 based on the actual max count in the data.
 * This avoids the "everything looks the same" problem for very active developers.
 */
function getLevel(count: number, max: number): number {
  if (count === 0 || max === 0) return 0;
  const r = count / max;
  if (r <= 0.12) return 1;
  if (r <= 0.35) return 2;
  if (r <= 0.65) return 3;
  return 4;
}

/** Extract month label positions from the week grid */
function getMonthLabels(
  weeks: GridDay[][],
): { label: string; colIndex: number }[] {
  const labels: { label: string; colIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const first = week.find(Boolean) as ContributionDay | undefined;
    if (!first) return;
    const m = new Date(first.date + 'T00:00:00').getMonth();
    if (m !== lastMonth) {
      labels.push({
        label: new Date(first.date + 'T00:00:00').toLocaleDateString('en-US', {
          month: 'short',
        }),
        colIndex: wi,
      });
      lastMonth = m;
    }
  });
  return labels;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// GitHub-accurate cell colors per intensity level
const CELL_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const CELL_HOVER = ['#21262d', '#196430', '#26a641', '#39d353', '#56e368'];

// Only show Mon / Wed / Fri labels (skip Sun, Tue, Thu, Sat)
const DOW_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

// ─── Mock data (shown when API has no contributionCalendar) ───────────────────
function makeMockDays(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const r = Math.random();
    const count =
      r < 0.22
        ? 0
        : r < 0.5
          ? Math.ceil(Math.random() * 3)
          : r < 0.72
            ? Math.ceil(Math.random() * 6) + 2
            : r < 0.9
              ? Math.ceil(Math.random() * 8) + 6
              : Math.ceil(Math.random() * 10) + 12;
    days.push({ date: d.toISOString().split('T')[0], count });
  }
  return days;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GithubStats() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    date: '',
    count: 0,
  });
  const heatmapRef = useRef<HTMLDivElement>(null);

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

  // Real data or mock fallback
  const calendarDays: ContributionDay[] = stats?.contributionCalendar?.length
    ? stats.contributionCalendar
    : makeMockDays();

  // Derive max contribution count for dynamic level calculation
  const maxCount = calendarDays.reduce((m, d) => Math.max(m, d.count), 0);

  // Build grid: array of week-columns, each with 7 day-rows (null = empty)
  const grid = buildGrid(calendarDays);
  const monthLabels = getMonthLabels(grid);

  // ── Stat card data ──────────────────────────────────────────────────────────

  const topStats = [
    {
      label: 'Contributions',
      value: stats?.totalContributions
        ? stats.totalContributions.toLocaleString()
        : 'N/A',
      icon: GitCommit,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      label: 'Repositories',
      value: stats?.totalRepositories ?? 0,
      icon: GitBranch,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      label: 'Stars',
      value: stats?.totalStars ?? 0,
      icon: Star,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      label: 'Pull Requests',
      value: stats?.pullRequests || 'N/A',
      icon: GitPullRequest,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
    },
  ];

  const streakStats = [
    {
      label: 'Current Streak',
      value: stats?.currentStreak ?? '—',
      icon: Flame,
      iconColor: 'text-orange-400',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
    },
    {
      label: 'Longest Streak',
      value: stats?.longestStreak ?? '—',
      icon: TrendingUp,
      iconColor: 'text-primary',
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Active Days',
      value: stats?.activeDays ?? '—',
      icon: Calendar,
      iconColor: 'text-emerald-400',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Followers',
      value: stats?.followers ?? '—',
      icon: Users,
      iconColor: 'text-muted-foreground',
      color: 'text-foreground',
      bg: 'bg-muted/40',
    },
  ];

  // ── Tooltip handler ─────────────────────────────────────────────────────────

  const handleCellEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    day: ContributionDay,
  ) => {
    const cellRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoveredCell(day.date);
    setTooltip({
      visible: true,
      x: cellRect.left + cellRect.width / 2,
      y: cellRect.top - 6,
      date: day.date,
      count: day.count,
    });
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
    setTooltip((t) => ({ ...t, visible: false }));
  };

  // ── Animation variants ──────────────────────────────────────────────────────

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <section id='github' className='py-10 md:py-14 scroll-mt-20'>
      <div className='max-w-5xl mx-auto px-6'>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-10'
        >
          <p className='text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-3'>
            Open Source
          </p>
          <h2 className='text-3xl md:text-4xl font-black tracking-tight'>
            GitHub Activity
          </h2>
          <p className='text-muted-foreground text-sm mt-3 max-w-md mx-auto'>
            A year of contributions, streaks, and open source work
          </p>
        </motion.div>

        {error ? (
          <p className='text-center text-red-500 text-sm py-8'>{error}</p>
        ) : (
          <div className='space-y-3'>
            {/* ── Row 1: Primary stats ── */}
            <motion.div
              className='grid grid-cols-2 lg:grid-cols-4 gap-3'
              variants={container}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
            >
              {topStats.map(
                ({ label, value, icon: Icon, color, bg, border }) => (
                  <motion.div
                    key={label}
                    variants={item}
                    className={`rounded-xl border ${border} ${bg} p-4 transition-all hover:brightness-105`}
                  >
                    <div className='flex items-center gap-2 mb-3'>
                      <Icon className={`h-3.5 w-3.5 ${color}`} />
                      <span className='text-xs text-muted-foreground font-medium'>
                        {label}
                      </span>
                    </div>
                    {loading ? (
                      <Skeleton className='h-7 w-16' />
                    ) : (
                      <div
                        className={`text-2xl font-black tracking-tight ${color}`}
                      >
                        {value}
                      </div>
                    )}
                  </motion.div>
                ),
              )}
            </motion.div>

            {/* ── Row 2: Streak stats ── */}
            <motion.div
              className='grid grid-cols-2 lg:grid-cols-4 gap-3'
              variants={container}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
            >
              {streakStats.map(
                ({ label, value, icon: Icon, iconColor, color, bg }) => (
                  <motion.div
                    key={label}
                    variants={item}
                    className={`rounded-xl border border-border ${bg} p-4 hover:border-primary/20 transition-all`}
                  >
                    <div className='flex items-center gap-2 mb-3'>
                      <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
                      <span className='text-xs text-muted-foreground font-medium'>
                        {label}
                      </span>
                    </div>
                    {loading ? (
                      <Skeleton className='h-7 w-12' />
                    ) : (
                      <div
                        className={`text-2xl font-black tracking-tight ${color}`}
                      >
                        {value}
                      </div>
                    )}
                  </motion.div>
                ),
              )}
            </motion.div>

            {/* ── Row 3: Heatmap ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className='rounded-xl border border-border bg-card overflow-hidden'
            >
              {/* Header */}
              <div className='flex items-center justify-between px-5 pt-5 pb-4 border-b border-border'>
                <div className='flex items-center gap-2.5'>
                  <div className='w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center'>
                    <GitCommit className='h-3.5 w-3.5 text-emerald-400' />
                  </div>
                  <div>
                    <p className='text-sm font-semibold leading-none'>
                      Contribution Activity
                    </p>
                    <p className='text-xs text-muted-foreground mt-1'>
                      Past 12 months
                    </p>
                  </div>
                </div>
                {!loading && stats?.totalContributions ? (
                  <div className='flex items-center gap-1.5'>
                    <span className='text-xs text-muted-foreground'>Total</span>
                    <span className='text-sm font-black text-emerald-400'>
                      {stats.totalContributions.toLocaleString()}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Grid body */}
              <div className='p-5'>
                {loading ? (
                  <div className='space-y-[3px]'>
                    {[...Array(7)].map((_, i) => (
                      <Skeleton
                        key={i}
                        className='h-[12px] w-full rounded-sm'
                      />
                    ))}
                  </div>
                ) : (
                  <div className='overflow-x-auto flex justify-center'>
                    <div style={{ minWidth: 640 }}>
                      {/* Month labels row */}
                      <div
                        style={{
                          display: 'flex',
                          marginBottom: 4,
                          marginLeft: 32,
                        }}
                      >
                        <div
                          style={{ flex: 1, position: 'relative', height: 16 }}
                        >
                          {monthLabels.map(({ label, colIndex }) => (
                            <span
                              key={`${label}-${colIndex}`}
                              style={{
                                position: 'absolute',
                                left: `${colIndex * 15}px`,
                                fontSize: 10,
                                color: 'var(--muted-foreground)',
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Weekday labels + cell grid */}
                      <div
                        style={{
                          display: 'flex',
                          gap: 4,
                          position: 'relative',
                          alignItems: 'flex-start',
                        }}
                        ref={heatmapRef}
                      >
                        {/* Weekday axis labels (7 rows) */}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            marginRight: 4,
                            flexShrink: 0,
                            width: 24,
                          }}
                        >
                          {DOW_LABELS.map((lbl, i) => (
                            <div
                              key={i}
                              style={{
                                height: 12,
                                fontSize: 9,
                                color: 'var(--muted-foreground)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                opacity: 0.6,
                              }}
                            >
                              {lbl}
                            </div>
                          ))}
                        </div>

                        {/* Week columns: each column = 1 week, each row = 1 day-of-week */}
                        <div
                          style={{
                            display: 'flex',
                            gap: 3,
                            flex: 1,
                            alignItems: 'flex-start',
                          }}
                        >
                          {grid.map((week, wi) => (
                            <div
                              key={wi}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                              }}
                            >
                              {week.map((day, di) => {
                                if (!day) {
                                  // Empty padding cell — preserve row height but show nothing
                                  return (
                                    <div
                                      key={`empty-${wi}-${di}`}
                                      style={{ width: 12, height: 12 }}
                                    />
                                  );
                                }
                                const level = getLevel(day.count, maxCount);
                                const isHovered = hoveredCell === day.date;
                                return (
                                  <div
                                    key={day.date}
                                    style={{
                                      width: 12,
                                      height: 12,
                                      borderRadius: 2,
                                      backgroundColor: isHovered
                                        ? CELL_HOVER[level]
                                        : CELL_COLORS[level],
                                      cursor: 'pointer',
                                      transition:
                                        'transform 0.1s ease, background-color 0.1s ease',
                                      transform: isHovered
                                        ? 'scale(1.4)'
                                        : 'scale(1)',
                                      outline:
                                        level === 0
                                          ? '1px solid #21262d'
                                          : 'none',
                                      zIndex: isHovered ? 10 : 'auto',
                                    }}
                                    onMouseEnter={(e) =>
                                      handleCellEnter(e, day)
                                    }
                                    onMouseLeave={handleCellLeave}
                                  />
                                );
                              })}
                            </div>
                          ))}
                        </div>

                        {/* Tooltip */}
                        <AnimatePresence>
                          {tooltip.visible && (
                            <motion.div
                              key='tooltip'
                              initial={{ opacity: 0, y: 6, scale: 0.92 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.92 }}
                              transition={{ duration: 0.1 }}
                              style={{
                                position: 'fixed', // ← was 'absolute'
                                left: tooltip.x,
                                top: tooltip.y,
                                transform: 'translate(-50%, -100%)',
                                pointerEvents: 'none',
                                zIndex: 9999, // ← higher z-index
                              }}
                            >
                              <div
                                style={{
                                  background: 'var(--popover)',
                                  border: '1px solid var(--border)',
                                  borderRadius: 8,
                                  padding: '6px 10px',
                                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                                  textAlign: 'center',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: 'var(--foreground)',
                                  }}
                                >
                                  {tooltip.count === 0
                                    ? 'No contributions'
                                    : `${tooltip.count} contribution${tooltip.count !== 1 ? 's' : ''}`}
                                </div>
                                <div
                                  style={{
                                    fontSize: 10,
                                    color: 'var(--muted-foreground)',
                                    marginTop: 2,
                                  }}
                                >
                                  {formatDate(tooltip.date)}
                                </div>
                              </div>
                              {/* Arrow */}
                              <div
                                style={{
                                  width: 8,
                                  height: 8,
                                  background: 'var(--popover)',
                                  borderRight: '1px solid var(--border)',
                                  borderBottom: '1px solid var(--border)',
                                  transform: 'rotate(45deg)',
                                  margin: '-4px auto 0',
                                }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Legend */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: 4,
                          marginTop: 10,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          Less
                        </span>
                        {CELL_COLORS.map((color, i) => (
                          <div
                            key={i}
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: 2,
                              backgroundColor: color,
                              outline: i === 0 ? '1px solid #21262d' : 'none',
                            }}
                          />
                        ))}
                        <span
                          style={{
                            fontSize: 10,
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          More
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

 
            {/* ── Row 4: Top Languages ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className='rounded-xl border border-border bg-card overflow-hidden'
            >
              {/* Header */}
              <div className='flex items-center justify-between px-5 pt-5 pb-4 border-b border-border'>
                <div>
                  <p className='text-sm font-semibold'>Top Languages</p>
                  <p className='text-xs text-muted-foreground mt-0.5'>
                    By repository count
                  </p>
                </div>
                {!loading && stats?.topLanguages?.length && (
                  <span className='text-xs text-muted-foreground'>
                    {stats.topLanguages.length} languages
                  </span>
                )}
              </div>

              <div className='p-5'>
                {loading ? (
                  <div className='space-y-3'>
                    <Skeleton className='h-3 w-full rounded-full' />
                    <div className='flex gap-4'>
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className='h-3 w-16' />
                      ))}
                    </div>
                  </div>
                ) : stats?.topLanguages?.length ? (
                  <div className='space-y-5'>
                    {/* Segmented bar */}
{/* Segmented bar */}
<div className='relative w-full'>
  {/* Glow layer */}
  <div
    className='absolute inset-0 rounded-full blur-md opacity-40 pointer-events-none'
    style={{
      background: `linear-gradient(to right, ${stats.topLanguages.map(l => l.color).join(', ')})`,
    }}
  />
  {/* Main bar */}
  <div className='relative flex h-4 w-full rounded-full overflow-hidden gap-[2px] ring-1 ring-white/10'>
    {stats.topLanguages.map((lang, i) => (
      <motion.div
        key={lang.name}
        className='h-full cursor-pointer first:rounded-l-full last:rounded-r-full relative overflow-hidden'
        style={{
          width: `${lang.percentage}%`,
          backgroundColor: lang.color,
          opacity: hoveredLang && hoveredLang !== lang.name ? 0.2 : 1,
          transition: 'opacity 0.2s, filter 0.2s, width 0.2s',
          filter: hoveredLang === lang.name ? 'brightness(1.4) saturate(1.3)' : 'brightness(1)',
        }}
        initial={{ width: 0 }}
        whileInView={{ width: `${lang.percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.08 }}
        onMouseEnter={() => setHoveredLang(lang.name)}
        onMouseLeave={() => setHoveredLang(null)}
        title={`${lang.name}: ${lang.percentage}%`}
      >
        {/* Shine overlay */}
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)',
          }}
        />
      </motion.div>
    ))}
  </div>
</div>

                    {/* Language cards */}
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2'>
                      {stats.topLanguages.map((lang) => {
                        const isHovered = hoveredLang === lang.name;
                        return (
                          <div
                            key={lang.name}
                            className='relative rounded-lg border border-border p-3 cursor-pointer'
                            style={{
                              background: isHovered
                                ? `${lang.color}18`
                                : 'transparent',
                              borderColor: isHovered
                                ? `${lang.color}50`
                                : undefined,
                              opacity: hoveredLang && !isHovered ? 0.4 : 1,
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={() => setHoveredLang(lang.name)}
                            onMouseLeave={() => setHoveredLang(null)}
                          >
                            <div className='flex items-center gap-2 mb-2'>
                              <div
                                className='w-2.5 h-2.5 rounded-full shrink-0'
                                style={{
                                  backgroundColor: lang.color,
                                  transform: isHovered
                                    ? 'scale(1.4)'
                                    : 'scale(1)',
                                  boxShadow: isHovered
                                    ? `0 0 8px ${lang.color}80`
                                    : 'none',
                                  transition: 'all 0.2s',
                                }}
                              />
                              <span className='text-xs font-medium text-foreground truncate'>
                                {lang.name}
                              </span>
                            </div>
                            <p
                              className='text-xl font-black tracking-tight'
                              style={{ color: lang.color }}
                            >
                              {lang.percentage}%
                            </p>
                            <div className='mt-2 h-1 w-full bg-muted rounded-full overflow-hidden'>
                              <motion.div
                                className='h-full rounded-full'
                                style={{ backgroundColor: lang.color }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${lang.percentage}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className='text-xs text-muted-foreground'>
                    No language data available
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Footer link */}
        <p className='text-center text-xs text-muted-foreground mt-6'>
          View full profile on{' '}
          <a
            href={`https://github.com/${username}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary hover:underline font-semibold'
          >
            GitHub →
          </a>
        </p>
      </div>
    </section>
  );
}
