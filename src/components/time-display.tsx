"use client"

import { useEffect, useMemo, useState } from "react"
import { Clock } from "lucide-react"

type TimeDisplayProps = {
  timeZone: string
  locale?: string
  showSeconds?: boolean
  compact?: boolean
  className?: string
  tzLabel?: string // override the timezone label (e.g., "IST")
}

function useNow(tickMs = 1000) {
  const [now, setNow] = useState<Date>(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), tickMs)
    return () => clearInterval(id)
  }, [tickMs])
  return now
}

export default function TimeDisplay({
  timeZone,
  locale = "en-IN",
  showSeconds = false,
  compact = false,
  className,
  tzLabel,
}: TimeDisplayProps) {
  const [mounted, setMounted] = useState(false)
  const now = useNow(showSeconds ? 1000 : 30_000)

  useEffect(() => setMounted(true), [])

  const { hour, minute, second, dayPeriod, tzAbbr, dateLabel } = useMemo(() => {
    const parts = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone,
      timeZoneName: "short",
    }).formatToParts(now)

    const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ""

    const tzName = get("timeZoneName")
    const dateFmt = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      day: "2-digit",
      month: "short",
      timeZone,
    }).format(now)

    // Some browsers show GMT+5:30 instead of IST. Allow override, and default to IST for Asia/Kolkata.
    const fallbackIST = timeZone === "Asia/Kolkata" ? "IST" : tzName

    return {
      hour: get("hour"),
      minute: get("minute"),
      second: get("second"),
      dayPeriod: get("dayPeriod"), // AM/PM
      tzAbbr: tzLabel || fallbackIST,
      dateLabel: dateFmt,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, now, timeZone, tzLabel])

  if (!mounted) {
    return (
      <div
        className={[
          "inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 backdrop-blur px-3 py-1.5 shadow-sm",
          "text-xs text-muted-foreground",
          className,
        ].join(" ")}
        aria-hidden="true"
      >
        <Clock className="h-3.5 w-3.5 opacity-70" />
        <span className="inline-block h-3 w-16 rounded-md bg-muted/50" />
      </div>
    )
  }

  return (
    <div
      className={[
        "group inline-flex items-center gap-3 rounded-full border border-border/50 bg-background/70 backdrop-blur px-3.5 py-1.5 shadow-sm transition",
        "hover:shadow-md hover:border-primary/30",
        className,
      ].join(" ")}
      aria-live="polite"
    >
      {/* Live dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-30"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
      </span>

      {/* Icon */}
      <Clock className="h-4 w-4 text-muted-foreground group-hover:text-foreground/80 transition-colors" />

      {/* Time */}
      <div className="flex items-baseline gap-2 tabular-nums text-sm text-foreground" suppressHydrationWarning>
        <div className="flex items-baseline">
          <span className="font-semibold">{hour}</span>
          <span className="mx-0.5 blink opacity-80">:</span>
          <span className="font-semibold">{minute}</span>
          {showSeconds && (
            <>
              <span className="mx-0.5 blink opacity-60">:</span>
              <span className="text-muted-foreground">{second}</span>
            </>
          )}
        </div>
        {!compact && <span className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">{dayPeriod}</span>}
      </div>

      {/* Separator */}
      {!compact && <span className="h-4 w-px bg-border/60" aria-hidden="true" />}

      {/* TZ and Date */}
      {!compact && (
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground" suppressHydrationWarning>
          <span className="px-1.5 py-0.5 rounded bg-muted/40 text-foreground/80">{tzAbbr}</span>
          <span className="hidden md:inline">{dateLabel}</span>
        </div>
      )}
    </div>
  )
}
