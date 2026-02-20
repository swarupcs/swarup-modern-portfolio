'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TechBadgeWithIcon } from '@/lib/tech-icons';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: string | null;
}

interface SkillCategory {
  name: string;
  skills: string[];
}

export default function SkillsSection() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio/skills')
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Skill[]) => {
        if (!Array.isArray(data) || data.length === 0) {
          // Fallback to defaults if DB is empty
          setCategories([
            {
              name: 'Frontend',
              skills: [
                'React',
                'Next.js',
                'TypeScript',
                'Tailwind CSS',
                'JavaScript',
              ],
            },
            {
              name: 'Backend',
              skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Python'],
            },
            {
              name: 'Tools & Platforms',
              skills: ['Vercel', 'AWS', 'Git', 'Docker', 'Figma'],
            },
          ]);
          return;
        }
        // Group skills by category
        const grouped = data.reduce(
          (acc, skill) => {
            const cat = skill.category || 'Other';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(skill.name);
            return acc;
          },
          {} as Record<string, string[]>,
        );

        setCategories(
          Object.entries(grouped).map(([name, skills]) => ({ name, skills })),
        );
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id='skills' className='py-16 md:py-24'>
      <div className='container px-4 md:px-6 max-w-5xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-16 text-center'
        >
          <p className='text-sm text-muted-foreground mb-2 uppercase tracking-wide'>
            Expertise
          </p>
          <h2 className='text-4xl md:text-5xl font-bold'>
            Technologies & Tools
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto mt-4'>
            A curated selection of technologies I use to build modern, scalable
            applications
          </p>
        </motion.div>

        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='h-32 rounded-xl border border-white/10 bg-card/30 animate-pulse'
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='grid grid-cols-1 md:grid-cols-3 gap-8'
          >
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={categoryVariants}
                className='space-y-4'
              >
                <h3 className='text-lg font-semibold text-foreground'>
                  {category.name}
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <TechBadgeWithIcon tech={skill} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
