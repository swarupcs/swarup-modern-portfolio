'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
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
        // Sort by "Present" first, then by start year descending
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

  // Description stored as a single string in DB — split by newline or period for bullet display
  const getDescriptionLines = (desc: string): string[] => {
    if (!desc) return [];
    // If admin entered multiple lines, split by newline
    const lines = desc
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    return lines.length > 1 ? lines : [desc];
  };

  return (
    <section id='experience' className='py-16 md:py-24'>
      <div className='container px-4 md:px-6 max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-20 text-center'
        >
          <p className='text-sm text-primary mb-3 uppercase tracking-widest font-semibold'>
            Featured
          </p>
          <h2 className='text-4xl md:text-5xl font-bold'>Experience</h2>
        </motion.div>

        {loading ? (
          <div className='space-y-6'>
            {[1, 2].map((i) => (
              <div
                key={i}
                className='h-48 rounded-2xl border border-white/10 bg-card/30 animate-pulse'
              />
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className='text-center text-muted-foreground py-12'>
            No experience entries yet. Add some from the admin panel.
          </div>
        ) : (
          <div className='space-y-6'>
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group border border-white/10 rounded-2xl p-8 md:p-10 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:via-transparent hover:to-secondary/5 transition-all duration-300 backdrop-blur-sm'
              >
                <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-6'>
                  <div className='flex-1 space-y-4'>
                    <div className='flex items-start justify-between gap-4'>
                      <div className='flex-1'>
                        <h3 className='text-2xl md:text-3xl font-bold'>
                          {experience.company}
                        </h3>
                        <p className='text-lg bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-semibold mt-2'>
                          {experience.role}
                        </p>
                      </div>
                      <div className='flex-shrink-0'>
                        {experience.duration
                          ?.toLowerCase()
                          .includes('present') && (
                          <Badge className='shrink-0 text-xs font-semibold px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30'>
                            <span className='inline-block w-2 h-2 rounded-full mr-2 bg-green-400 animate-pulse' />
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-3 md:gap-6 text-sm text-muted-foreground'>
                      <p className='font-medium'>{experience.duration}</p>
                    </div>

                    <ul className='space-y-2 pt-2'>
                      {getDescriptionLines(experience.description).map(
                        (item, idx) => (
                          <li
                            key={idx}
                            className='text-sm text-muted-foreground flex gap-3'
                          >
                            <span className='text-primary/60 shrink-0'>›</span>
                            <span className='flex-1'>{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                {experience.skills?.length > 0 && (
                  <div className='mt-6 pt-6 border-t border-border'>
                    <h4 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3'>
                      Technologies
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {experience.skills.map((skill) => (
                        <TechBadgeWithIcon
                          key={skill}
                          tech={skill}
                          className='text-xs'
                        />
                      ))}
                    </div>
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
