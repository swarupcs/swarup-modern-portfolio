"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Eye, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { projectsData } from "@/lib/projects"



// Expanded project data with more details, including the Playground project


const categories = ["All", "Full Stack", "Frontend", "AI/ML", "Mobile", "Experiments"]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visibleProjects, setVisibleProjects] = useState(6)

  const filteredProjects =
    selectedCategory === "All" ? projectsData : projectsData.filter((project) => project.category === selectedCategory)

  const showMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, filteredProjects.length))
  }

  const showLessProjects = () => {
    setVisibleProjects(6)
  }

  // Determine if link is internal for target handling
  const isInternal = (url: string) => url.startsWith("/")

  return (
    <section className="py-16 md:py-24">
      <div className="px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">My Work</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of projects showcasing my skills in web development, design, and problem-solving
            </p>

            {/* Category Filter */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category)
                    setVisibleProjects(6)
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredProjects.slice(0, visibleProjects).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="overflow-hidden h-full border-2 border-transparent hover:border-primary/20 transition-all">
                  <div className="relative overflow-hidden group">
                    <Image
                      src={project.image || "/placeholder.svg?height=400&width=600"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge className="bg-primary">{project.category}</Badge>
                      <Badge variant="secondary">{project.year}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="text-base line-clamp-3">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="secondary">+{project.technologies.length - 4} more</Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Button variant="default" size="sm" asChild className="flex-1">
                      <Link
                        href={project.liveUrl}
                        target={isInternal(project.liveUrl) ? undefined : "_blank"}
                        rel={isInternal(project.liveUrl) ? undefined : "noopener noreferrer"}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        {isInternal(project.liveUrl) ? "Open" : "Live Demo"}
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Show More/Less Buttons */}
          {filteredProjects.length > 6 && (
            <div className="flex justify-center gap-4">
              {visibleProjects < filteredProjects.length && (
                <Button onClick={showMoreProjects} size="lg">
                  Show More Projects
                </Button>
              )}
              {visibleProjects > 6 && (
                <Button variant="outline" onClick={showLessProjects} size="lg">
                  Show Less
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
