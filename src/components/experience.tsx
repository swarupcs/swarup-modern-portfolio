'use client';

import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import Link from 'next/link';
import { TechBadgeWithIcon } from '@/lib/tech-icons';

const experienceData = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'Fi-Tek Pvt. Ltd',
    status: 'Working',
    duration: 'August 2024 - Present',
    location: 'Kolkata, India (On-Site)',
    description: [
      'Led the development of the company’s core product, achieving a performance improvement of approximately 40%.',
      'Designed and implemented scalable frontend architectures using modern React and Next.js best practices.',
      'Collaborated closely with backend teams to integrate APIs efficiently and ensure smooth data flow across the application.',
      'Mentored junior developers, conducted code reviews, and enforced clean coding standards and best practices.',
    ],
    technologies: [
      { name: 'React', url: 'https://react.dev/' },
      { name: 'Next.js', url: 'https://nextjs.org/' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
      { name: 'Redux', url: 'https://redux.js.org/' },
      { name: 'Node.js', url: 'https://nodejs.org/' },
      { name: 'MongoDB', url: 'https://www.mongodb.com/' },
    ],
  },
  {
    id: 2,
    role: 'Data Analytics Intern',
    company: 'IBM CSRBOX',
    status: 'Completed',
    duration: 'June 2023 - July 2024',
    location: 'India (Remote)',
    description: [
      'Developed a data analytics dashboard for a client, improving operational efficiency by nearly 20%.',
      'Worked on data preprocessing, analysis, and visualization to derive actionable insights from large datasets.',
      'Applied machine learning and deep learning techniques to solve real-world analytical problems.',
      'Collaborated with cross-functional teams to understand business requirements and translate them into data-driven solutions.',
    ],
    technologies: [
      { name: 'Python', url: 'https://www.python.org/' },
      { name: 'Machine Learning', url: 'https://scikit-learn.org/' },
      { name: 'Deep Learning', url: 'https://www.tensorflow.org/' },
    ],
  },
];


export default function Experience() {
  return (
    <section id='experience' className='py-16 md:py-24'>
      <div className='container px-4 md:px-6 max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-16 text-center'
        >
          <p className='text-sm text-muted-foreground mb-2 uppercase tracking-wide'>
            Featured
          </p>
          <h2 className='text-4xl md:text-5xl font-bold'>Experience</h2>
        </motion.div>

        <div className='space-y-16'>
          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className='space-y-4'
            >
              <div className='space-y-2'>
                <div className='flex flex-wrap items-center justify-between gap-3'>
                  <h3 className='text-2xl md:text-3xl font-bold'>
                    {experience.company}
                  </h3>
                  <Badge
                    variant={
                      experience.status === 'Working' ? 'default' : 'secondary'
                    }
                    className='shrink-0'
                  >
                    {experience.status}
                  </Badge>
                </div>
                <p className='text-lg md:text-xl font-medium'>
                  {experience.role}
                </p>
                <div className='flex flex-col gap-1 text-sm text-muted-foreground'>
                  <p>{experience.duration}</p>
                  <p className='flex items-center gap-2'>
                    <Building2 className='h-4 w-4' />
                    {experience.location}
                  </p>
                </div>
              </div>

              <div className='space-y-3'>
                <h4 className='text-sm font-semibold'>Technologies & Tools</h4>
                <div className='flex flex-wrap gap-2'>
                  {experience.technologies.map((tech) => (
                    <TechBadgeWithIcon
                      key={tech.name}
                      tech={tech.name}
                      className='text-xs'
                    />
                  ))}
                </div>
              </div>

              <ul className='space-y-2 pt-2'>
                {experience.description.map((item, idx) => (
                  <li
                    key={idx}
                    className='text-base text-muted-foreground flex gap-3'
                  >
                    <span className='text-primary mt-1 shrink-0'>•</span>
                    <span className='flex-1'>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className='mt-16 text-center'
        >
          <Link
            href='/work'
            className='text-base text-primary hover:underline underline-offset-4 font-medium'
          >
            Show all work experiences
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
