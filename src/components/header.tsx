"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Briefcase, BookText, Mail, Code2, Timer } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const nav = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  { href: "/work", label: "Work", icon: Briefcase, match: (p: string) => p.startsWith("/work") },
  { href: "/experience", label: "Experience", icon: Timer, match: (p: string) => p.startsWith("/experience") },
  { href: "/blog", label: "Blog", icon: BookText, match: (p: string) => p.startsWith("/blog") },
  { href: "/contact", label: "Contact", icon: Mail, match: (p: string) => p.startsWith("/contact") },
  // New Playground item in header nav
  {
    href: "/work/playground",
    label: "Playground",
    icon: Code2,
    match: (p: string) => p.startsWith("/work/playground"),
  },
]

export default function Header() {
  const pathname = usePathname() || "/"

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50 border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Portfolio
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1 rounded-full border bg-background/60 px-2 py-1 shadow-sm"
        >
          {nav.map((item) => {
            const active = item.match(pathname)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="ghost" className="md:hidden">
            <Link href="/work/playground">
              <Code2 className="mr-2 h-4 w-4" />
              Playground
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
