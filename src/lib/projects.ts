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

export const projectsData: ProjectItem[] = [
  // {
  //   id: 1,
  //   title: "E-Commerce Platform",
  //   description:
  //     "A full-featured e-commerce platform with product management, shopping cart, payment integration, and order tracking. Built with modern technologies for optimal performance.",
  //   image: "/ecommerce-platform-product-grid.jpg",
  //   technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL", "Prisma"],
  //   liveUrl: "https://ecommerce-demo.com",
  //   githubUrl: "https://github.com/yourusername/ecommerce",
  //   featured: true,
  //   category: "Full Stack",
  //   year: "2024",
  //   challenge: "Building a scalable payment system and inventory management",
  //   solution: "Implemented Stripe for payments and real-time inventory updates",
  // },
  // {
  //   id: 2,
  //   title: "Task Management App",
  //   description:
  //     "Collaborative project management tool with real-time updates, drag-and-drop kanban boards, team chat, and advanced analytics.",
  //   image: "/kanban-board-collaboration-app.jpg",
  //   technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Redux"],
  //   liveUrl: "https://taskmanager-demo.com",
  //   githubUrl: "https://github.com/yourusername/task-manager",
  //   featured: true,
  //   category: "Full Stack",
  //   year: "2024",
  //   challenge: "Real-time collaboration without performance degradation",
  //   solution: "WebSocket connections with optimistic UI updates",
  // },
  // {
  //   id: 3,
  //   title: "Weather Dashboard",
  //   description:
  //     "Interactive weather dashboard with location-based forecasts, historical data visualization, and weather alerts.",
  //   image: "/weather-dashboard-charts.jpg",
  //   technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Sass", "Vuex"],
  //   liveUrl: "https://weather-dashboard-demo.com",
  //   githubUrl: "https://github.com/yourusername/weather-app",
  //   featured: false,
  //   category: "Frontend",
  //   year: "2023",
  //   challenge: "Displaying complex weather data intuitively",
  //   solution: "Custom visualizations with Chart.js and interactive maps",
  // },
  // {
  //   id: 4,
  //   title: "AI Chat Bot",
  //   description:
  //     "Intelligent conversational AI with context-aware responses, multi-language support, and custom training.",
  //   image: "/ai-chatbot-interface.png",
  //   technologies: ["Python", "FastAPI", "OpenAI API", "React", "WebSocket", "Redis"],
  //   liveUrl: "https://ai-chatbot-demo.com",
  //   githubUrl: "https://github.com/yourusername/ai-chatbot",
  //   featured: true,
  //   category: "AI/ML",
  //   year: "2024",
  //   challenge: "Maintaining conversation context across sessions",
  //   solution: "Redis caching for conversation history and context management",
  // },
  // {
  //   id: 5,
  //   title: "Portfolio CMS",
  //   description:
  //     "Headless CMS for managing portfolio content with drag-and-drop editor, media library, and robust API endpoints.",
  //   image: "/headless-cms-ui.jpg",
  //   technologies: ["Next.js", "Sanity.io", "TypeScript", "Tailwind CSS"],
  //   liveUrl: "https://portfolio-cms-demo.com",
  //   githubUrl: "https://github.com/yourusername/portfolio-cms",
  //   featured: false,
  //   category: "Full Stack",
  //   year: "2023",
  //   challenge: "Creating a flexible content structure",
  //   solution: "Custom content types with Sanity's schema builder",
  // },
  // {
  //   id: 6,
  //   title: "Fitness Tracker",
  //   description:
  //     "Mobile-first fitness tracking app with workout plans, progress tracking, nutrition logging, and social features.",
  //   image: "/fitness-tracker-mobile-app.jpg",
  //   technologies: ["React Native", "Firebase", "TypeScript", "Expo"],
  //   liveUrl: "https://fitness-tracker-demo.com",
  //   githubUrl: "https://github.com/yourusername/fitness-tracker",
  //   featured: false,
  //   category: "Mobile",
  //   year: "2023",
  //   challenge: "Offline functionality for workout tracking",
  //   solution: "Local storage with Firebase sync when online",
  // },
  // {
  //   id: 7,
  //   title: "Interactive Coding Playground",
  //   description:
  //     "A live, sandboxed playground to experiment with HTML, CSS, and JavaScript. Includes templates, console output, and Tailwind CDN toggle.",
  //   image: "/code-editor-and-preview-sandbox-in-browser.jpg",
  //   technologies: ["TypeScript", "Next.js", "shadcn/ui", "iframes"],
  //   liveUrl: "/work/playground",
  //   githubUrl: "https://github.com/yourusername/portfolio",
  //   featured: true,
  //   category: "Experiments",
  //   year: "2025",
  //   challenge: "Safely executing user code in-browser",
  //   solution: "Isolated iframe with postMessage console bridge and sandbox",
  // },
]