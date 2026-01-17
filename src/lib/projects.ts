export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  year?: string;
  hidden?: boolean;
};

export const projectsData: ProjectItem[] = [
  {
    id: '1',
    title: 'Algodrill',
    description:
      'Algodrill is a modern DSA and coding practice platform offering structured problems, detailed explanations, test cases, and progress tracking to help developers prepare for coding interviews.',
    image: '/algodrill.png',
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
    liveUrl: 'https://algodrill.in',
    githubUrl: 'https://github.com/swarupcs/algodrill',
    featured: true,
    category: 'Full Stack',
    year: '2024',
    hidden: false,
  },
  {
    id: '2',
    title: 'Linkly',
    description:
      'A full-stack real-time team collaboration platform inspired by Slack, featuring channels, instant messaging, authentication, and an interactive workspace.',
    image: '/linkly.png',
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
    liveUrl: 'https://linkly.swarupdas.dev/',
    githubUrl: 'https://github.com/swarupcs/linkly',
    featured: false,
    category: 'Full Stack',
    year: '2024',
    hidden: false,
  },
  {
    id: '3',
    title: 'Shortify',
    description:
      'A fast and minimal URL shortener built with Next.js, enabling users to generate compact links and handle redirections efficiently.',
    image: '/shortify.png',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
    ],
    liveUrl: 'https://shortify.swarupdas.dev/',
    githubUrl: 'https://github.com/swarupcs/shortify',
    featured: false,
    category: 'Full Stack',
    year: '2024',
    hidden: false,
  },
  {
    id: '4',
    title: 'Dev-Collab',
    description:
      'A real-time collaboration platform for developers, supporting instant messaging, project rooms, and a shared workspace experience.',
    image: '/dev-collab.png',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Socket.io',
      'Node.js',
    ],
    liveUrl: 'https://dev-collab.swarupdas.dev/',
    githubUrl: 'https://github.com/swarupcs/dev-collab',
    featured: false,
    category: 'Full Stack',
    year: '2024',
    hidden: false,
  },
];
