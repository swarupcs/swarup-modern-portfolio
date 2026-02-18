'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  featured: boolean;
}

interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

interface SkillItem {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  id: string;
  name: string;
  skills: SkillItem[];
}

interface AboutInterest {
  label: string;
  color: string;
}

interface AboutData {
  bio1: string;
  bio2: string;
  interests: AboutInterest[];
  socialLinks: string[];
}

interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  about?: AboutData;
}

const defaultData: PortfolioData = {
  personalInfo: {
    name: 'Swarup Das',
    title: 'Full-Stack Developer',
    bio: 'Passionate developer with 5+ years of experience in creating scalable web applications.',
    avatar: '/placeholder.svg?height=200&width=200',
    location: 'West Bengal, India',
    email: 'john@example.com',
    phone: '6290994583',
    resumeUrl: '/resume.pdf',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      website: 'https://yourwebsite.com',
    },
  },
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description:
        'A modern, scalable e-commerce solution built with Next.js and Stripe integration.',
      image: '/placeholder.svg?height=300&width=600',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
      githubUrl: 'https://github.com/yourusername/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      category: 'Web Development',
      featured: true,
    },
  ],
  experience: [
    {
      id: '1',
      role: 'Senior Frontend Developer',
      company: 'Tech Company',
      duration: 'Jan 2022 - Present',
      description:
        "Led the development of the company's main product, improving performance by 40%.",
      skills: ['React', 'TypeScript', 'Next.js', 'Redux'],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University Name',
      duration: '2015 - 2019',
      description:
        'Focused on software engineering and web development. Graduated with honors.',
    },
  ],
  skills: [
    {
      id: 'frontend',
      name: 'Frontend',
      skills: [
        { name: 'React', level: 95, icon: '⚛️' },
        { name: 'Next.js', level: 90, icon: '▲' },
        { name: 'TypeScript', level: 88, icon: '📘' },
      ],
    },
  ],
  about: {
    bio1:
      'I am a passionate developer with experience in building scalable web applications and modern user interfaces.',
    bio2:
      'I enjoy working across the stack, learning new technologies, and contributing to impactful products.',
    interests: [
      { label: 'Web Performance', color: 'text-orange-500' },
      { label: 'Developer Experience', color: 'text-blue-500' },
    ],
    socialLinks: [],
  },
};

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updatePortfolioData: (data: Partial<PortfolioData>) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolioData, setPortfolioData] =
    useState<PortfolioData>(defaultData);

  useEffect(() => {
    const stored = localStorage.getItem('portfolioData');
    if (stored) {
      try {
        setPortfolioData(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing portfolio data:', error);
      }
    }
  }, []);

  const updatePortfolioData = (data: Partial<PortfolioData>) => {
    setPortfolioData((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem('portfolioData', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PortfolioContext.Provider value={{ portfolioData, updatePortfolioData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};
