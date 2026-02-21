import type React from 'react';
import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiPrisma,
  SiStripe,
  SiVuedotjs,
  SiChartdotjs,
  SiPython,
  SiOpenai,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiRedux,
  SiNestjs,
  SiPostman,
  SiBun,
  SiVercel,
  SiAmazon,
  SiFigma,
  SiSocketdotio,
  SiRedis,
  SiJsonwebtokens,
  SiJavascript,
  SiGit,
  SiDocker,
  SiShadcnui,
  SiGithub,
} from 'react-icons/si';
import { GiBrain } from 'react-icons/gi';

export const techIconsWithColors: Record<
  string,
  { icon: IconType; color: string }
> = {
  // Frontend
  React: { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#ffffff' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  Redux: { icon: SiRedux, color: '#764ABC' },
  'Vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
  'shadcn/ui': { icon: SiShadcnui, color: '#ffffff' },
  'Chart.js': { icon: SiChartdotjs, color: '#FF6384' },

  // Backend
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Express.js': { icon: SiExpress, color: '#ffffff' },
  Express: { icon: SiExpress, color: '#ffffff' },
  PostgreSQL: { icon: SiPostgresql, color: '#336791' },
  MongoDB: { icon: SiMongodb, color: '#13AA52' },
  Mongoose: { icon: SiMongodb, color: '#13AA52' },
  Python: { icon: SiPython, color: '#3776AB' },
  Prisma: { icon: SiPrisma, color: '#5a67d8' },
  'Socket.io': { icon: SiSocketdotio, color: '#ffffff' },
  Redis: { icon: SiRedis, color: '#DC382D' },
  JWT: { icon: SiJsonwebtokens, color: '#d63aff' },
  NestJS: { icon: SiNestjs, color: '#E0234E' },

  // Tools & Platforms
  Git: { icon: SiGit, color: '#F05032' },
  GitHub: { icon: SiGithub, color: '#ffffff' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  Vercel: { icon: SiVercel, color: '#ffffff' },
  AWS: { icon: SiAmazon, color: '#FF9900' },
  Figma: { icon: SiFigma, color: '#F24E1E' },
  Postman: { icon: SiPostman, color: '#FF6C02' },
  Bun: { icon: SiBun, color: '#FBF0DF' },
  Stripe: { icon: SiStripe, color: '#5469D4' },
  'OpenAI API': { icon: SiOpenai, color: '#412991' },

  // Data & ML
  'Machine Learning': { icon: GiBrain, color: '#a78bfa' },
  'Deep Learning': { icon: GiBrain, color: '#818cf8' },
};

export const techIcons: Record<string, IconType> = Object.fromEntries(
  Object.entries(techIconsWithColors).map(([k, v]) => [k, v.icon]),
);

export function getTechIcon(techName: string) {
  return techIcons[techName] || null;
}

export function TechBadgeWithIcon({
  tech,
  className = '',
}: {
  tech: string;
  className?: string;
}) {
  const techData = techIconsWithColors[tech];
  const IconComponent = techData?.icon;

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 ${className}`}
    >
      {IconComponent && (
        <IconComponent
          className='w-3.5 h-3.5 shrink-0'
          style={{ color: techData?.color }}
        />
      )}
      <span className='text-xs font-medium text-white/80'>{tech}</span>
    </div>
  );
}
