/// <reference types="node" />
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter } as any);

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

  const skills = [
    // Frontend
    { name: 'React', category: 'Frontend', level: 90, icon: null },
    { name: 'Next.js', category: 'Frontend', level: 88, icon: null },
    { name: 'TypeScript', category: 'Frontend', level: 85, icon: null },
    { name: 'Tailwind CSS', category: 'Frontend', level: 90, icon: null },
    { name: 'JavaScript', category: 'Frontend', level: 92, icon: null },
    // Backend
    { name: 'Node.js', category: 'Backend', level: 80, icon: null },
    { name: 'Express', category: 'Backend', level: 78, icon: null },
    { name: 'PostgreSQL', category: 'Backend', level: 75, icon: null },
    { name: 'MongoDB', category: 'Backend', level: 78, icon: null },
    { name: 'Python', category: 'Backend', level: 72, icon: null },
    // Tools & Platforms
    { name: 'Git', category: 'Tools & Platforms', level: 85, icon: null },
    { name: 'Docker', category: 'Tools & Platforms', level: 65, icon: null },
    { name: 'Vercel', category: 'Tools & Platforms', level: 80, icon: null },
    { name: 'AWS', category: 'Tools & Platforms', level: 60, icon: null },
    { name: 'Figma', category: 'Tools & Platforms', level: 70, icon: null },
    // Data & ML
    { name: 'Machine Learning', category: 'Data & ML', level: 70, icon: null },
    { name: 'Deep Learning', category: 'Data & ML', level: 65, icon: null },
    { name: 'Redux', category: 'Frontend', level: 80, icon: null },
  ];

  await prisma.skill.createMany({ data: skills });
  console.log('✅ Skills seeded');

  // ─── Projects ────────────────────────────────────────────────────
  await prisma.projectTechnology.deleteMany();
  await prisma.project.deleteMany();

  const project1 = await prisma.project.create({
    data: {
      title: 'Swarup Portfolio',
      description:
        'A modern, fully dynamic portfolio website built with Next.js 14, TypeScript, Prisma, and PostgreSQL. Features an admin panel for managing all content including projects, skills, experience, and personal info.',
      image: null,
      liveUrl: 'https://swarup-portfolio.vercel.app',
      githubUrl: 'https://github.com/swarupcs/swarup-portfolio',
      category: 'Web Development',
      featured: true,
      hidden: false,
    },
  });

  await prisma.projectTechnology.createMany({
    data: [
      { projectId: project1.id, technology: 'Next.js' },
      { projectId: project1.id, technology: 'TypeScript' },
      { projectId: project1.id, technology: 'Prisma' },
      { projectId: project1.id, technology: 'PostgreSQL' },
      { projectId: project1.id, technology: 'Tailwind CSS' },
    ],
  });

  console.log('✅ Projects seeded');

  console.log('\n🎉 All data seeded successfully!');
  console.log('👉 Go to /admin and login with: admin / admin123');
  console.log(
    '👉 Update your actual projects from the admin panel at /admin/dashboard',
  );
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
