'use client';

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Globe } from 'lucide-react';
import { TechBadgeWithIcon } from '@/lib/tech-icons';
import { projectsData } from '@/lib/projects';


export default function Projects() {
  // Use projects data directly from projects-data.ts
  const filteredProjects = projectsData.filter(
    (project) => project.hidden !== true,
  );

  const isInternal = (url: string) => url?.startsWith('/');

  return (
    <section id='projects' className='py-20 md:py-32'>
      <div className='container px-4 md:px-6 max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-20 text-center'
        >
          <p className='text-sm text-primary mb-3 uppercase tracking-widest font-semibold'>
            Featured
          </p>
          <h2 className='text-5xl md:text-6xl font-black gradient-blue-pink'>
            Projects
          </h2>
          <p className='text-muted-foreground text-lg mt-4 max-w-2xl mx-auto'>
            Showcase of innovative projects built with modern technologies
          </p>
        </motion.div>

        {filteredProjects.length === 0 ? (
          <div className='text-center text-muted-foreground py-12'>
            No projects to display.
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10'>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group h-full'
              >
                <div className='flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-card/50 to-card hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 backdrop-blur-sm hover:backdrop-blur-md'>
                  <div className='relative h-56 md:h-64 w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500'>
                    {project.image ? (
                      <div
                        className='w-full h-full absolute transition-transform duration-500 group-hover:scale-105'
                        style={{
                          transform: 'rotateY(-8deg) rotateX(4deg)',
                          transformOrigin: 'center',
                        }}
                      >
                        <Image
                          src={
                            project.image ||
                            '/placeholder.svg?height=300&width=600&query=project thumbnail'
                          }
                          alt={project.title}
                          fill
                          className='object-cover'
                        />
                      </div>
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-muted-foreground bg-muted'>
                        No image available
                      </div>
                    )}
                  </div>

                  <div className='p-6 md:p-8 flex flex-col flex-1'>
                    <div className='flex items-start justify-between gap-4 mb-4'>
                      <h3 className='text-2xl font-bold group-hover:text-primary transition-colors flex-1 leading-tight'>
                        {project.title}
                      </h3>
                      <div className='flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0'>
                        {project.liveUrl && !isInternal(project.liveUrl) && (
                          <a
                            href={project.liveUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:opacity-100'
                          >
                            <Globe className='w-5 h-5' />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:opacity-100'
                          >
                            <Github className='w-5 h-5' />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className='text-sm md:text-base text-muted-foreground mb-6 flex-1 leading-relaxed line-clamp-3'>
                      {project.description}
                    </p>

                    <div className='mb-6'>
                      <p className='text-xs uppercase text-muted-foreground tracking-wider mb-3 font-semibold'>
                        Technologies
                      </p>
                      <div className='flex flex-wrap gap-2.5'>
                        {(project.technologies || [])
                          .slice(0, 6)
                          .map((tech) => (
                            <TechBadgeWithIcon key={tech} tech={tech} />
                          ))}
                      </div>
                    </div>

                    <div className='flex items-center justify-between pt-4 border-t border-border'>
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-green-500' />
                        <span className='text-xs font-medium text-muted-foreground'>
                          Active
                        </span>
                      </div>

                      <Link
                        href={`/projects/${project.id}`}
                        className='text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 group/link'
                      >
                        Details
                        <ExternalLink className='w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform' />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className='mt-16 text-center'
        >
          <Link
            href='/projects'
            className='inline-block px-6 py-3 border border-primary text-primary hover:bg-primary/5 transition-colors rounded-lg font-medium'
          >
            Show all projects
          </Link>
        </motion.div> */}
      </div>
    </section>
  );
}
