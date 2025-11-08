"use client"

import { useState } from "react"
import { Code, Server, Database, Wrench } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend")

  const categories = [
    { id: "frontend", name: "Frontend", icon: Code },
    { id: "backend", name: "Backend", icon: Server },
    { id: "database", name: "Database", icon: Database },
    { id: "tools", name: "Tools", icon: Wrench },
  ]

  const skills = {
    frontend: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 80, icon: "▲" },
      { name: "TypeScript", level: 60, icon: "📘" },
      { name: "Tailwind CSS", level: 92, icon: "🎨" },
      { name: "JavaScript", level: 95, icon: "🟨" },
    ],
    backend: [
      { name: "Node.js", level: 90, icon: "🟢" },
      { name: "Python", level: 85, icon: "🐍" },
      { name: "Express.js", level: 88, icon: "🚀" },
      { name: "FastAPI", level: 82, icon: "⚡" },
      { name: "GraphQL", level: 80, icon: "🔗" },
      { name: "REST APIs", level: 92, icon: "🌐" },
    ],
    database: [
      { name: "PostgreSQL", level: 88, icon: "🐘" },
      { name: "MongoDB", level: 85, icon: "🍃" },
      { name: "Redis", level: 80, icon: "🔴" },
      { name: "Prisma", level: 85, icon: "⚡" },
      { name: "Supabase", level: 82, icon: "🚀" },
      { name: "Firebase", level: 78, icon: "🔥" },
    ],
    tools: [
      { name: "Git", level: 95, icon: "📝" },
      { name: "Docker", level: 85, icon: "🐳" },
      { name: "AWS", level: 80, icon: "☁️" },
      { name: "Vercel", level: 90, icon: "▲" },
      // { name: "Figma", level: 75, icon: "🎨" },
      { name: "VS Code", level: 98, icon: "💙" },
    ],
  }

  return (
    <section id="skills" className="py-20 px-4 md:px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="lg"
                className="gap-2"
              >
                <Icon className="h-5 w-5" />
                <span>{category.name}</span>
              </Button>
            )
          })}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills[activeCategory as keyof typeof skills].map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-all hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{skill.icon}</span>
                      <span className="font-semibold text-lg">{skill.name}</span>
                    </div>
                    <span className="text-primary font-bold text-lg">{skill.level}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full relative overflow-hidden"
                    >
                      <motion.div
                        animate={{
                          x: ["0%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
