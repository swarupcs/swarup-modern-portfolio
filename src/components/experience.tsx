'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { TechBadgeWithIcon } from '@/lib/tech-icons';

interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio/experience')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!Array.isArray(data)) return setExperiences([]);
        const sorted = data.sort((a, b) => {
          const aPresent = a.duration?.toLowerCase().includes('present');
          const bPresent = b.duration?.toLowerCase().includes('present');
          if (aPresent && !bPresent) return -1;
          if (!aPresent && bPresent) return 1;
          return 0;
        });
        setExperiences(sorted);
      })
      .catch(() => setExperiences([]))
      .finally(() => setLoading(false));
  }, []);

  const getDescriptionLines = (desc: string): string[] => {
    if (!desc) return [];
    const lines = desc
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    return lines.length > 1 ? lines : [desc];
  };

  return (
    <section id='experience' className='py-20 md:py-28 scroll-mt-20'>
      <div className='max-w-3xl mx-auto px-6'>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-14'
        >
          <p className='text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-3'>
            Featured
          </p>
          <h2 className='text-3xl md:text-4xl font-black tracking-tight'>
            Experience
          </h2>
        </motion.div>

        {loading ? (
          <div className='space-y-4'>
            {[1, 2].map((i) => (
              <div
                key={i}
                className='h-40 rounded-xl border border-border bg-card/30 animate-pulse'
              />
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className='text-center text-muted-foreground py-12 text-sm'>
            No experience entries yet.
          </div>
        ) : (
          <div className='space-y-4'>
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className='group rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300'
              >
                {/* Header row */}
                <div className='flex items-start justify-between gap-4 mb-3'>
                  <div>
                    <h3 className='text-base font-bold leading-snug'>
                      {experience.company}
                    </h3>
                    <p className='text-sm text-primary font-medium mt-0.5'>
                      {experience.role}
                    </p>
                    <p className='text-xs text-muted-foreground mt-1'>
                      {experience.duration}
                    </p>
                  </div>
                  {experience.duration?.toLowerCase().includes('present') && (
                    <Badge className='shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20'>
                      <span className='inline-block w-1.5 h-1.5 rounded-full mr-1.5 bg-green-500 animate-pulse' />
                      Active
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <ul className='space-y-1.5 mb-4'>
                  {getDescriptionLines(experience.description)
                    .slice(0, 3)
                    .map((item, idx) => (
                      <li
                        key={idx}
                        className='text-xs text-muted-foreground flex gap-2 leading-relaxed'
                      >
                        <span className='text-primary/50 shrink-0 mt-0.5'>
                          ›
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>

                {/* Skills */}
                {experience.skills?.length > 0 && (
                  <div className='flex flex-wrap gap-1.5 pt-3 border-t border-border'>
                    {experience.skills.map((skill) => (
                      <TechBadgeWithIcon key={skill} tech={skill} />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
