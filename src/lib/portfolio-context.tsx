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
  company: string;
  position: string;
  duration: string;
  description: string;
  skills: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
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

interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
}

const defaultData: PortfolioData = {
  personalInfo: {
    name: 'Swarup Das',
    title: 'Full-Stack Developer',
    bio: 'Passionate developer with 5+ years of experience in creating scalable web applications.',
    avatar: '/placeholder.svg?height=200&width=200',
    location: 'San Francisco, CA',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    resumeUrl: '/resume.pdf',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      website: 'https://yourwebsite.com',
    },
  },
  projects: [],
  experience: [],
  education: [],
  skills: [],
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
