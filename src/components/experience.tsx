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

        <div className='space-y-6'>
          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group border border-white/10 rounded-2xl p-8 md:p-10 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:via-transparent hover:to-secondary/5 transition-all duration-300 backdrop-blur-sm'
            >
              <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-6'>
                {/* Left content */}
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
                      <Badge
                        variant={
                          experience.status === 'Working'
                            ? 'default'
                            : 'secondary'
                        }
                        className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${
                          experience.status === 'Working'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}
                      >
                        <span
                          className={`inline-block w-2 h-2 rounded-full mr-2 ${experience.status === 'Working' ? 'bg-green-400' : 'bg-blue-400'} animate-pulse`}
                        ></span>
                        {experience.status}
                      </Badge>
                    </div>
                  </div>

                  <div className='flex flex-col md:flex-row gap-3 md:gap-6 text-sm text-muted-foreground'>
                    <p className='font-medium'>{experience.duration}</p>
                    <p className='flex items-center gap-2'>
                      <Building2 className='h-4 w-4 shrink-0' />
                      {experience.location}
                    </p>
                  </div>

                  {/* Description */}
                  <ul className='space-y-2 pt-2'>
                    {experience.description.map((item, idx) => (
                      <li
                        key={idx}
                        className='text-sm text-muted-foreground flex gap-3'
                      >
                        <span className='text-primary/60 shrink-0'>›</span>
                        <span className='flex-1'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies */}
              <div className='mt-6 pt-6 border-t border-border'>
                <h4 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3'>
                  Technologies
                </h4>
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
            </motion.div>
          ))}
        </div>

        {/* <motion.div
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
        </motion.div> */}
      </div>
    </section>
  );
}
