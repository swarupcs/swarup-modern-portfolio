'use client';

import Hero from '@/components/hero';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import SkillsSection from '@/components/skills-section';
import About from '@/components/about';
import GithubStats from '@/components/github-stats';
import LeetcodeStats from '@/components/leetcode-stats';
import BlogPreviewSection from '@/components/blog-preview-section';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <SkillsSection />
        <GithubStats />
        <LeetcodeStats />
        <BlogPreviewSection />
      </main>
    </div>
  );
}
