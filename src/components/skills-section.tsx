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

  return (
    <section id='skills' className='py-20 md:py-28 scroll-mt-20'>
      <div className='max-w-3xl mx-auto px-6'>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-14'
        >
          <p className='text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-3'>
            Expertise
          </p>
          <h2 className='text-3xl md:text-4xl font-black tracking-tight'>
            Technologies & Tools
          </h2>
          <p className='text-muted-foreground text-sm mt-3 max-w-md mx-auto'>
            A curated stack of technologies I use to build modern, scalable
            applications
          </p>
        </motion.div>

        {loading ? (
          <div className='space-y-6'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='h-20 rounded-xl border border-border bg-card/30 animate-pulse'
              />
            ))}
          </div>
        ) : (
          <div className='space-y-8'>
            {categories.map((category, catIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: catIndex * 0.08 }}
              >
                {/* Category label */}
                <div className='flex items-center gap-3 mb-3'>
                  <span className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
                    {category.name}
                  </span>
                  <div className='flex-1 h-px bg-border' />
                </div>

                {/* Skills */}
                <div className='flex flex-wrap gap-2'>
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.25,
                        delay: catIndex * 0.05 + skillIndex * 0.03,
                      }}
                      whileHover={{ scale: 1.05, y: -1 }}
                    >
                      <TechBadgeWithIcon tech={skill} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
