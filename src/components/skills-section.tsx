'use client';

import { motion } from 'framer-motion';
import { TechBadgeWithIcon } from '@/lib/tech-icons';

export default function SkillsSection() {
  const skills = [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'PostgreSQL',
    'MongoDB',
    'Tailwind CSS',
    'Express',
    'Python',
    'Vercel',
    'AWS',
  ];

  return (
    <section id='skills' className='py-20 md:py-32'>
      <div className='container px-4 md:px-6 max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-12 text-center'
        >
          <p className='text-sm text-muted-foreground mb-2 uppercase tracking-wide'>
            Skills
          </p>
          <h2 className='text-3xl md:text-4xl font-bold'>
            Technologies & Tools
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.05 }}
          className='flex flex-wrap justify-center gap-3'
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
            >
              <TechBadgeWithIcon tech={skill} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
