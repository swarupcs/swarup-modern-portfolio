'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Globe } from 'lucide-react';
import { TechBadgeWithIcon } from '@/lib/tech-icons';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  category: string | null;
  featured: boolean;
  hidden: boolean;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio/projects')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const isInternal = (url: string) => url?.startsWith('/');

  return (
    <section id='projects' className='py-14 md:py-20 scroll-mt-20'>
      <div className='max-w-5xl mx-auto px-6'>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-10'
        >
          <p className='text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-3'>
            Featured
          </p>
          <h2 className='text-4xl md:text-5xl font-black tracking-tight'>
            Projects
          </h2>
          <p className='text-muted-foreground text-base mt-3 max-w-md mx-auto'>
            A selection of things I&apos;ve built
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='h-64 rounded-xl border border-border bg-card/30 animate-pulse'
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className='text-center text-muted-foreground py-12 text-base'>
            No projects yet. Add some from the admin panel.
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className='group'
              >
                <div className='flex flex-col h-full rounded-xl overflow-hidden border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300'>
                  {/* Image */}
                  <div className='relative h-40 w-full overflow-hidden bg-muted'>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <span className='text-4xl font-black text-muted-foreground/20'>
                          {project.title.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    {/* Status dot */}
                    <div className='absolute top-2.5 left-2.5'>
                      <span className='flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur text-xs font-medium text-green-500 border border-green-500/20'>
                        <span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse' />
                        {project.featured ? 'Featured' : 'Live'}
                      </span>
                    </div>
                    {/* Icon links */}
                    <div className='absolute top-2.5 right-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity'>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='w-8 h-8 rounded-lg bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors'
                        >
                          <Github className='w-4 h-4' />
                        </a>
                      )}
                      {project.liveUrl && !isInternal(project.liveUrl) && (
                        <a
                          href={project.liveUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='w-8 h-8 rounded-lg bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors'
                        >
                          <Globe className='w-4 h-4' />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className='p-5 flex flex-col flex-1 gap-3'>
                    <div>
                      <h3 className='text-base font-bold leading-snug group-hover:text-primary transition-colors'>
                        {project.title}
                      </h3>
                      <p className='text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed'>
                        {project.description}
                      </p>
                    </div>

                    {/* Tech */}
                    <div className='flex flex-wrap gap-1.5 mt-auto'>
                      {(project.technologies || []).slice(0, 4).map((tech) => (
                        <TechBadgeWithIcon key={tech} tech={tech} />
                      ))}
                      {project.technologies?.length > 4 && (
                        <span className='text-xs text-muted-foreground px-1.5 py-0.5 rounded border border-border'>
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target={
                          isInternal(project.liveUrl) ? '_self' : '_blank'
                        }
                        rel='noopener noreferrer'
                        className='flex items-center gap-1 text-sm font-semibold text-primary hover:underline mt-1'
                      >
                        View project
                        <ExternalLink className='w-3.5 h-3.5' />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
