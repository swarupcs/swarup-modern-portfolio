"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  description?: string
}

export default function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
        {description && <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{description}</p>}
      </div>
    </motion.div>
  )
}
