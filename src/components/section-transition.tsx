"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionTransitionProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionTransition({ children, className, id }: SectionTransitionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  )
}
