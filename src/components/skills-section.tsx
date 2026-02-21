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

const CATEGORY_ACCENTS: Record<
  string,
  { dot: string; line: string; label: string }
> = {
  Frontend: {
    dot: 'bg-violet-400',
    line: 'from-violet-500/40 to-transparent',
    label: 'text-violet-400',
  },
  Backend: {
    dot: 'bg-cyan-400',
    line: 'from-cyan-500/40 to-transparent',
    label: 'text-cyan-400',
  },
  'Tools & Platforms': {
    dot: 'bg-amber-400',
    line: 'from-amber-500/40 to-transparent',
    label: 'text-amber-400',
  },
  'Data & ML': {
    dot: 'bg-green-400',
    line: 'from-green-500/40 to-transparent',
    label: 'text-green-400',
  },
  Other: {
    dot: 'bg-[#6b7280]',
    line: 'from-[#6b7280]/40 to-transparent',
    label: 'text-[#9ca3af]',
  },
};

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
              skills: [
                'Node.js',
                'Express.js',
                'PostgreSQL',
                'MongoDB',
                'Python',
              ],
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

        // Preferred category order
        const order = [
          'Frontend',
          'Backend',
          'Tools & Platforms',
          'Data & ML',
          'Other',
        ];
        const sorted = order
          .filter((k) => grouped[k])
          .map((k) => ({ name: k, skills: grouped[k] }));
        // Append any unlisted categories
        Object.keys(grouped).forEach((k) => {
          if (!order.includes(k)) sorted.push({ name: k, skills: grouped[k] });
        });

        setCategories(sorted);
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id='skills' className='py-16 md:py-24 scroll-mt-20'>
      <div className='max-w-5xl mx-auto px-6'>
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
          <h2 className='text-4xl md:text-5xl font-black tracking-tight'>
            Technologies & Tools
          </h2>
          <p className='text-muted-foreground text-sm mt-4 max-w-md mx-auto'>
            A curated stack of technologies I use to build modern, scalable
            applications
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {loading ? (
          <div className='space-y-8'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='space-y-3'>
                <div className='h-4 w-28 rounded bg-white/5 animate-pulse' />
                <div className='flex flex-wrap gap-2'>
                  {[...Array(6)].map((_, j) => (
                    <div
                      key={j}
                      className='h-8 w-24 rounded-lg bg-white/5 animate-pulse'
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='space-y-10'>
            {categories.map((category, catIndex) => {
              const accent =
                CATEGORY_ACCENTS[category.name] ?? CATEGORY_ACCENTS.Other;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: catIndex * 0.08 }}
                >
                  {/* Category header */}
                  <div className='flex items-center gap-3 mb-4'>
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${accent.dot}`}
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-widest ${accent.label}`}
                    >
                      {category.name}
                    </span>
                    <div
                      className={`flex-1 h-px bg-gradient-to-r ${accent.line}`}
                    />
                  </div>

                  {/* Badges */}
                  <div className='flex flex-wrap gap-2 pl-5'>
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.88 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.2,
                          delay: catIndex * 0.04 + skillIndex * 0.025,
                        }}
                        whileHover={{ scale: 1.06, y: -2 }}
                      >
                        <TechBadgeWithIcon tech={skill} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
