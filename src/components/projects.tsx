'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { usePortfolio } from '@/lib/portfolio-context';
import { TechBadgeWithIcon } from '@/lib/tech-icons';

import { projectsData as fallbackProjects, ProjectItem } from '@/lib/projects';



export default function Projects() {
  const { portfolioData } = usePortfolio();

  // Prefer admin-managed projects, fallback to sample data if none exist
  // const data = (
  //   portfolioData.projects?.length ? portfolioData.projects : fallbackProjects
  // ) as (ProjectItem & {
  //   // allow admin projects without year, etc.
  //   year?: string;
  // })[];

  const data = fallbackProjects;

  // Build category list dynamically from data
  const categories = useMemo(() => {
    const set = new Set<string>(data.map((p) => p.category || 'Other'));
    return ['All', ...Array.from(set)];
  }, [data]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(6);

  const filteredProjects = useMemo(() => {
    const base = data.filter((project) => project.hidden !== true);
    if (selectedCategory === 'All') return base;
    return base.filter((p) => (p.category || 'Other') === selectedCategory);
  }, [data, selectedCategory]);

  const showMoreProjects = () =>
    setVisibleProjects((prev) => Math.min(prev + 3, filteredProjects.length));
  const showLessProjects = () => setVisibleProjects(6);

  const isInternal = (url: string) => url?.startsWith('/');

  return (
    <section id='projects' className='py-16 md:py-24'>
      <div className='container px-4 md:px-6 max-w-5xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-16 text-center'
        >
          <p className='text-sm text-muted-foreground mb-2 uppercase tracking-wide'>
            Featured
          </p>
          <h2 className='text-4xl md:text-5xl font-bold'>Projects</h2>
        </motion.div>

        {filteredProjects.length === 0 ? (
          <div className='text-center text-muted-foreground py-12'>
            No projects to display.
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {filteredProjects.slice(0, 4).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className='group h-full'
              >
                <div className='flex flex-col h-full border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 bg-card hover:shadow-lg hover:shadow-primary/10'>
                  {/* Project Image */}
                  <div className='relative h-48 md:h-56 w-full overflow-hidden bg-secondary'>
                    {project.image ? (
                      <Image
                        src={project.image || '/placeholder.svg'}
                        alt={project.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
                        No image available
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className='p-6 flex flex-col flex-1'>
                    <h3 className='text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors'>
                      {project.title}
                    </h3>

                    <p className='text-sm md:text-base text-muted-foreground mb-4 flex-1 leading-relaxed'>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className='mb-4'>
                      <div className='flex flex-wrap gap-2'>
                        {(project.technologies || []).map((tech) => (
                          <TechBadgeWithIcon key={tech} tech={tech} />
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className='flex items-center gap-3 pt-4 border-t border-border'>
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target={
                            !isInternal(project.liveUrl) ? '_blank' : undefined
                          }
                          rel={
                            !isInternal(project.liveUrl)
                              ? 'noopener noreferrer'
                              : undefined
                          }
                          className='flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors'
                        >
                          <ExternalLink className='w-4 h-4' />
                          <span>Live Demo</span>
                        </Link>
                      )}

                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
                        >
                          <Github className='w-4 h-4' />
                          <span>GitHub</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className='mt-16 text-center'
        >
          <Link
            href='/projects'
            className='text-base text-primary hover:underline underline-offset-4 font-medium'
          >
            Show all projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
