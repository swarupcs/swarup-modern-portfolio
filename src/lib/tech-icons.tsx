import type React from 'react';
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
} from 'react-icons/si';

export const techIconsWithColors: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  React: { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  PostgreSQL: { icon: SiPostgresql, color: '#336791' },
  Prisma: { icon: SiPrisma, color: '#2D3748' },
  Stripe: { icon: SiStripe, color: '#5469D4' },
  'Vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
  'Chart.js': { icon: SiChartdotjs, color: '#FF6384' },
  Python: { icon: SiPython, color: '#3776AB' },
  'OpenAI API': { icon: SiOpenai, color: '#412991' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  MongoDB: { icon: SiMongodb, color: '#13AA52' },
  Express: { icon: SiExpress, color: '#000000' },
  Redux: { icon: SiRedux, color: '#764ABC' },
  NestJS: { icon: SiNestjs, color: '#E0234E' },
  Postman: { icon: SiPostman, color: '#FF6C02' },
  Bun: { icon: SiBun, color: '#FBF0DF' },
  Vercel: { icon: SiVercel, color: '#000000' },
  AWS: { icon: SiAmazon, color: '#FF9900' },
  Figma: { icon: SiFigma, color: '#F24E1E' },
};

export const techIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  PostgreSQL: SiPostgresql,
  Prisma: SiPrisma,
  Stripe: SiStripe,
  'Vue.js': SiVuedotjs,
  'Chart.js': SiChartdotjs,
  Python: SiPython,
  'OpenAI API': SiOpenai,
  'Node.js': SiNodedotjs,
  MongoDB: SiMongodb,
  Express: SiExpress,
  Redux: SiRedux,
  NestJS: SiNestjs,
  Postman: SiPostman,
  Bun: SiBun,
  Vercel: SiVercel,
  AWS: SiAmazon,
  Figma: SiFigma,
};

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
      className={`flex items-center gap-2 px-3 py-1 rounded-md bg-secondary hover:bg-primary/20 transition-colors ${className}`}
    >
      {IconComponent && (
        <IconComponent className='w-4 h-4' style={{ color: techData?.color }} />
      )}
      <span className='text-xs font-medium'>{tech}</span>
    </div>
  );
}
