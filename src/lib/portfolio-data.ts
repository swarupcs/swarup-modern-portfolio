export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  featured: boolean;
  hidden: boolean;
}

export interface Skill {
  name: string
  level: number
  icon: string
}

export interface SkillCategory {
  id: string
  name: string
  skills: Skill[]
}

export interface Experience {
  id: string
  role: string
  company: string
  duration: string
  description: string
  skills: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  duration: string
  description: string
}

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  location: string
  email: string
  phone: string
  avatar: string
  resumeUrl: string
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
    website: string
  }
}

export interface AboutInterest {
  label: string
  color: string
}

export interface AboutData {
  bio1: string
  bio2: string
  interests: AboutInterest[]
  socialLinks: string[]
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  projects: Project[]
  skills: SkillCategory[]
  experience: Experience[]
  education: Education[]
  about?: AboutData
}

export const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: "Your Name",
    title: "Full Stack Developer",
    bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. I love turning complex problems into simple, beautiful solutions.",
    location: "West Bengal, India",
    email: "swarupd1999@gmail.com",
    phone: "6290994583",
    avatar: "https://github.com/shadcn.png",
    resumeUrl: "/resume.pdf",
    socialLinks: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername",
      website: "https://yourwebsite.com",
    },
  },
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description:
        "A modern, scalable e-commerce solution built with Next.js and Stripe integration. Features include real-time inventory, advanced search, and mobile-responsive design.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/yourusername/ecommerce",
      category: "Web Development",
      featured: true,
    },
  ],
  skills: [
    {
      id: "frontend",
      name: "Frontend",
      skills: [
        { name: "React", level: 95, icon: "⚛️" },
        { name: "Next.js", level: 90, icon: "▲" },
        { name: "TypeScript", level: 88, icon: "📘" },
      ],
    },
  ],
  experience: [
    {
      id: "1",
      role: "Senior Frontend Developer",
      company: "Tech Company",
      duration: "Jan 2022 - Present",
      description:
        "Led the development of the company's main product, improving performance by 40%. Mentored junior developers and implemented best practices.",
      skills: ["React", "TypeScript", "Next.js", "Redux"],
    },
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University Name",
      duration: "2015 - 2019",
      description: "Focused on software engineering and web development. Graduated with honors.",
    },
  ],
  about: {
    bio1:
      "I am a passionate developer with experience in building scalable web applications and modern user interfaces.",
    bio2:
      "I enjoy working across the stack, learning new technologies, and contributing to impactful products.",
    interests: [
      { label: "Web Performance", color: "text-orange-500" },
      { label: "Developer Experience", color: "text-blue-500" },
    ],
    socialLinks: [],
  },
}
