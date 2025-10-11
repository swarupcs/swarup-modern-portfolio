"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Eye, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

type ProjectItem = {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
  category: string
  year: string
  challenge?: string
  solution?: string
}

// Expanded project data with more details, including the Playground project
const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, shopping cart, payment integration, and order tracking. Built with modern technologies for optimal performance.",
    image: "/ecommerce-platform-product-grid.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL", "Prisma"],
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/yourusername/ecommerce",
    featured: true,
    category: "Full Stack",
    year: "2024",
    challenge: "Building a scalable payment system and inventory management",
    solution: "Implemented Stripe for payments and real-time inventory updates",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates, drag-and-drop kanban boards, team chat, and advanced analytics.",
    image: "/kanban-board-collaboration-app.jpg",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Redux"],
    liveUrl: "https://taskmanager-demo.com",
    githubUrl: "https://github.com/yourusername/task-manager",
    featured: true,
    category: "Full Stack",
    year: "2024",
    challenge: "Real-time collaboration without performance degradation",
    solution: "WebSocket connections with optimistic UI updates",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Interactive weather dashboard with location-based forecasts, historical data visualization, and weather alerts.",
    image: "/weather-dashboard-charts.jpg",
    technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Sass", "Vuex"],
    liveUrl: "https://weather-dashboard-demo.com",
    githubUrl: "https://github.com/yourusername/weather-app",
    featured: false,
    category: "Frontend",
    year: "2023",
    challenge: "Displaying complex weather data intuitively",
    solution: "Custom visualizations with Chart.js and interactive maps",
  },
  {
    id: 4,
    title: "AI Chat Bot",
    description:
      "Intelligent conversational AI with context-aware responses, multi-language support, and custom training.",
    image: "/ai-chatbot-interface.png",
    technologies: ["Python", "FastAPI", "OpenAI API", "React", "WebSocket", "Redis"],
    liveUrl: "https://ai-chatbot-demo.com",
    githubUrl: "https://github.com/yourusername/ai-chatbot",
    featured: true,
    category: "AI/ML",
    year: "2024",
    challenge: "Maintaining conversation context across sessions",
    solution: "Redis caching for conversation history and context management",
  },
  {
    id: 5,
    title: "Portfolio CMS",
    description:
      "Headless CMS for managing portfolio content with drag-and-drop editor, media library, and robust API endpoints.",
    image: "/headless-cms-ui.jpg",
    technologies: ["Next.js", "Sanity.io", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://portfolio-cms-demo.com",
    githubUrl: "https://github.com/yourusername/portfolio-cms",
    featured: false,
    category: "Full Stack",
    year: "2023",
    challenge: "Creating a flexible content structure",
    solution: "Custom content types with Sanity's schema builder",
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description:
      "Mobile-first fitness tracking app with workout plans, progress tracking, nutrition logging, and social features.",
    image: "/fitness-tracker-mobile-app.jpg",
    technologies: ["React Native", "Firebase", "TypeScript", "Expo"],
    liveUrl: "https://fitness-tracker-demo.com",
    githubUrl: "https://github.com/yourusername/fitness-tracker",
    featured: false,
    category: "Mobile",
    year: "2023",
    challenge: "Offline functionality for workout tracking",
    solution: "Local storage with Firebase sync when online",
  },
  {
    id: 7,
    title: "Interactive Coding Playground",
    description:
      "A live, sandboxed playground to experiment with HTML, CSS, and JavaScript. Includes templates, console output, and Tailwind CDN toggle.",
    image: "/code-editor-and-preview-sandbox-in-browser.jpg",
    technologies: ["TypeScript", "Next.js", "shadcn/ui", "iframes"],
    liveUrl: "/work/playground",
    githubUrl: "https://github.com/yourusername/portfolio",
    featured: true,
    category: "Experiments",
    year: "2025",
    challenge: "Safely executing user code in-browser",
    solution: "Isolated iframe with postMessage console bridge and sandbox",
  },
]

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
