'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import SectionHeading from './section-heading';

// Sample education data - replace with your own
const educationData = [
  {
    id: 1,
    degree: 'Master of Science in Computer Science',
    institution: 'University of Technology',
    location: 'West Bengal, India',
    duration: 'Aug 2018 - May 2020',
    description:
      "Specialized in Artificial Intelligence and Machine Learning. Completed thesis on 'Deep Learning Applications in Natural Language Processing'.",
    achievements: ['GPA: 3.9/4.0', "Dean's List", 'Research Assistant'],
    courses: [
      'Advanced Algorithms',
      'Machine Learning',
      'Neural Networks',
      'Data Visualization',
    ],
  },
  {
    id: 2,
    degree: 'Bachelor of Science in Computer Engineering',
    institution: 'State University',
    location: 'Boston, MA',
    duration: 'Aug 2014 - May 2018',
    description:
      'Focused on software development and computer architecture. Participated in multiple hackathons and coding competitions.',
    achievements: [
      'GPA: 3.7/4.0',
      'Scholarship Recipient',
      'Programming Club President',
    ],
    courses: [
      'Data Structures',
      'Operating Systems',
      'Web Development',
      'Database Systems',
    ],
  },
  {
    id: 3,
    degree: 'Full Stack Web Development Bootcamp',
    institution: 'Coding Academy',
    location: 'Online',
    duration: 'Jan 2018 - Apr 2018',
    description:
      'Intensive 12-week program covering modern web development technologies and practices. Built multiple full-stack applications.',
    achievements: ['Best Final Project Award'],
    courses: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
  },
];

export default function Education() {
  return (
    <section id='education' className='py-16 md:py-24 bg-muted/50'>
      <div className='container px-4 md:px-6'>
        <SectionHeading
          title='Education'
          description='My academic background and qualifications'
        />
        <div className='mx-auto mt-12 max-w-3xl space-y-0'>
          {educationData.map((education, index) => (
            <motion.div
              key={education.id}
              className='relative'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Timeline connector */}
              {index < educationData.length - 1 && (
                <motion.div
                  className='absolute left-[15px] top-[40px] bottom-0 w-[2px] bg-primary/20 md:left-1/2 md:ml-[-1px] md:top-[28px]'
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              )}

              <div className='flex flex-col md:flex-row md:items-start md:gap-8 pb-10'>
                <div className='mb-4 hidden md:block md:w-1/2 md:text-right md:pr-8 pt-1'>
                  <span className='text-sm font-medium text-muted-foreground'>
                    {education.duration}
                  </span>
                </div>

                {/* Timeline dot */}
                <motion.div
                  className='absolute left-0 top-1.5 h-8 w-8 rounded-full border-4 border-background bg-primary md:left-1/2 md:ml-[-16px] md:top-1'
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.2,
                  }}
                />

                <div className='pl-12 md:pl-0 md:w-1/2 md:pl-8'>
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow:
                        '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Card className='border-2 border-transparent hover:border-primary/20'>
                      <CardHeader>
                        <div className='space-y-1'>
                          <CardTitle>{education.degree}</CardTitle>
                          <CardDescription className='flex flex-col gap-1'>
                            <span className='font-medium'>
                              {education.institution}
                            </span>
                            <span>{education.location}</span>
                            <span className='md:hidden'>
                              {education.duration}
                            </span>
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className='mb-4 text-sm text-muted-foreground'>
                          {education.description}
                        </p>

                        {education.achievements.length > 0 && (
                          <div className='mb-4'>
                            <h4 className='text-sm font-semibold mb-2'>
                              Achievements
                            </h4>
                            <ul className='list-disc pl-5 text-sm text-muted-foreground'>
                              {education.achievements.map((achievement) => (
                                <li key={achievement}>{achievement}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className='flex flex-wrap gap-2'>
                          {education.courses.map((course) => (
                            <Badge key={course} variant='secondary'>
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
