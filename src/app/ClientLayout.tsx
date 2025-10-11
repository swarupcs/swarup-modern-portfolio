"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { PortfolioProvider } from "@/lib/portfolio-context"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <PortfolioProvider>
        <div className="relative min-h-screen">
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  )
}
