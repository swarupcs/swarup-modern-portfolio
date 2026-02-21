/// <reference types="node" />
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL ?? '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
async function main() {
  console.log('🌱 Seeding database with portfolio data...');

  // ─── Personal Info ───────────────────────────────────────────────
  await prisma.personalInfo.deleteMany();
  await prisma.personalInfo.create({
    data: {
      name: 'Swarup Das',
      title: 'Full Stack Developer',
      subtitle:
        'I craft elegant digital experiences while building scalable full-stack systems.',
      email: 'swarupd1999@gmail.com',
      phone: '6290994583',
      location: 'Kolkata, West Bengal, India',
      github: 'https://github.com/swarupcs',
      linkedin: 'https://linkedin.com/in/swarup-d',
      twitter: null,
      website: null,
      resume: '/Swarup_Resume.pdf',
      avatar: null,
    },
  });
  console.log('✅ Personal info seeded');

  // ─── About ───────────────────────────────────────────────────────
  await prisma.about.deleteMany();
  await prisma.about.create({
    data: {
      bio: "I'm a passionate full-stack developer dedicated to building exceptional digital experiences. I transform complex problems into elegant, scalable solutions using modern web technologies.",
      description:
        "My expertise spans React, Next.js, Node.js, TypeScript, and cloud platforms. I'm obsessed with clean code, performance optimization, and creating interfaces that delight users.",
      highlights: [
        'Coffee Enthusiast',
        'Open Source Contributor',
        'Problem Solver',
      ],
    },
  });
  console.log('✅ About seeded');

  // ─── Experience ──────────────────────────────────────────────────
  await prisma.experienceSkill.deleteMany();
  await prisma.experience.deleteMany();

  const exp1 = await prisma.experience.create({
    data: {
      role: 'Software Engineer',
      company: 'Fi-Tek Pvt. Ltd',
      duration: 'August 2024 - Present',
      description:
        "Led the development of the company's core product, achieving a performance improvement of approximately 40%.\nDesigned and implemented scalable frontend architectures using modern React and Next.js best practices.\nCollaborated closely with backend teams to integrate APIs efficiently and ensure smooth data flow across the application.\nMentored junior developers, conducted code reviews, and enforced clean coding standards and best practices.",
    },
  });
  await prisma.experienceSkill.createMany({
    data: [
      { experienceId: exp1.id, skill: 'React' },
      { experienceId: exp1.id, skill: 'Next.js' },
      { experienceId: exp1.id, skill: 'TypeScript' },
      { experienceId: exp1.id, skill: 'Redux' },
      { experienceId: exp1.id, skill: 'Node.js' },
      { experienceId: exp1.id, skill: 'MongoDB' },
    ],
  });

  const exp2 = await prisma.experience.create({
    data: {
      role: 'Data Analytics Intern',
      company: 'IBM CSRBOX',
      duration: 'June 2023 - July 2024',
      description:
        'Developed a data analytics dashboard for a client, improving operational efficiency by nearly 20%.\nWorked on data preprocessing, analysis, and visualization to derive actionable insights from large datasets.\nApplied machine learning and deep learning techniques to solve real-world analytical problems.\nCollaborated with cross-functional teams to understand business requirements and translate them into data-driven solutions.',
    },
  });
  await prisma.experienceSkill.createMany({
    data: [
      { experienceId: exp2.id, skill: 'Python' },
      { experienceId: exp2.id, skill: 'Machine Learning' },
      { experienceId: exp2.id, skill: 'Deep Learning' },
    ],
  });
  console.log('✅ Experience seeded');

  // ─── Skills ──────────────────────────────────────────────────────
  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: [
      { name: 'React', category: 'Frontend', level: 90, icon: null },
      { name: 'Next.js', category: 'Frontend', level: 88, icon: null },
      { name: 'TypeScript', category: 'Frontend', level: 85, icon: null },
      { name: 'Tailwind CSS', category: 'Frontend', level: 90, icon: null },
      { name: 'JavaScript', category: 'Frontend', level: 92, icon: null },
      { name: 'Redux', category: 'Frontend', level: 80, icon: null },
      { name: 'Node.js', category: 'Backend', level: 80, icon: null },
      { name: 'Express.js', category: 'Backend', level: 78, icon: null },
      { name: 'PostgreSQL', category: 'Backend', level: 75, icon: null },
      { name: 'MongoDB', category: 'Backend', level: 78, icon: null },
      { name: 'Python', category: 'Backend', level: 72, icon: null },
      { name: 'Prisma', category: 'Backend', level: 80, icon: null },
      { name: 'Socket.io', category: 'Backend', level: 75, icon: null },
      { name: 'Redis', category: 'Backend', level: 65, icon: null },
      { name: 'JWT', category: 'Backend', level: 78, icon: null },
      { name: 'Git', category: 'Tools & Platforms', level: 85, icon: null },
      { name: 'Docker', category: 'Tools & Platforms', level: 65, icon: null },
      { name: 'Vercel', category: 'Tools & Platforms', level: 80, icon: null },
      { name: 'AWS', category: 'Tools & Platforms', level: 60, icon: null },
      { name: 'Figma', category: 'Tools & Platforms', level: 70, icon: null },
      {
        name: 'Machine Learning',
        category: 'Data & ML',
        level: 70,
        icon: null,
      },
      { name: 'Deep Learning', category: 'Data & ML', level: 65, icon: null },
    ],
  });
  console.log('✅ Skills seeded');

  // ─── Projects ────────────────────────────────────────────────────
  await prisma.projectTechnology.deleteMany();
  await prisma.project.deleteMany();

  const projectsData = [
    {
      title: 'Algodrill',
      description:
        'Algodrill is a modern DSA and coding practice platform offering structured problems, detailed explanations, test cases, and progress tracking to help developers prepare for coding interviews.',
      image: '/images/algodrill.png',
      liveUrl: 'https://algodrill.in',
      githubUrl: 'https://github.com/swarupcs/algodrill',
      category: 'Full Stack',
      featured: true,
      hidden: false,
      technologies: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'Prisma',
        'JWT',
      ],
    },
    {
      title: 'Linkly',
      description:
        'A full-stack real-time team collaboration platform inspired by Slack, featuring channels, instant messaging, authentication, and an interactive workspace.',
      image: '/images/linkly.png',
      liveUrl: 'https://linkly.swarupdas.dev/',
      githubUrl: 'https://github.com/swarupcs/linkly',
      category: 'Full Stack',
      featured: false,
      hidden: false,
      technologies: [
        'React',
        'Tailwind CSS',
        'shadcn/ui',
        'Express.js',
        'Socket.io',
        'MongoDB',
        'Mongoose',
        'Redis',
        'JWT',
      ],
    },
    {
      title: 'Shortify',
      description:
        'A fast and minimal URL shortener built with Next.js, enabling users to generate compact links and handle redirections efficiently.',
      image: '/images/shortify.png',
      liveUrl: 'https://shortify.swarupdas.dev/',
      githubUrl: 'https://github.com/swarupcs/shortify',
      category: 'Full Stack',
      featured: false,
      hidden: false,
      technologies: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Prisma',
        'PostgreSQL',
      ],
    },
    {
      title: 'Dev-Collab',
      description:
        'A real-time collaboration platform for developers, supporting instant messaging, project rooms, and a shared workspace experience.',
      image: '/images/dev-collab.png',
      liveUrl: 'https://dev-collab.swarupdas.dev/',
      githubUrl: 'https://github.com/swarupcs/dev-collab',
      category: 'Full Stack',
      featured: false,
      hidden: false,
      technologies: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Socket.io',
        'Node.js',
      ],
    },
  ];

  for (const p of projectsData) {
    const { technologies, ...projectData } = p;
    const created = await prisma.project.create({ data: projectData });
    await prisma.projectTechnology.createMany({
      data: technologies.map((technology) => ({
        projectId: created.id,
        technology,
      })),
    });
    console.log(`  ✓ ${created.title}`);
  }
  console.log('✅ Projects seeded (4 projects)');

  console.log('\n🎉 All data seeded successfully!');
  console.log('👉 Login at /admin with: admin / admin123');
  console.log('👉 Upload project thumbnails from /admin/dashboard → Projects');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
