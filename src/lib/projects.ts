type ProjectItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  year: string;
  challenge?: string;
  solution?: string;
};

export const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: 'Algodrill',
    description:
      'Algodrill is a modern DSA and coding practice platform that provides structured problem sets, explanations, test cases, and progress tracking to help developers prepare for coding interviews.',
    image: '/algodrill-cover.jpg',
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
    challenge:
      'Building a scalable problem-solving platform with user authentication, test cases, and accurate submission evaluation.',
    solution:
      'Designed a clean full-stack architecture using optimized APIs, Prisma ORM, and a responsive UI for seamless practicing.',
  },

  {
    id: 2,
    title: 'Linkly',
    description:
      'A full-stack real-time team collaboration platform inspired by Slack, featuring channels, messaging, authentication, and an interactive workspace UI.',
    image: '/slack-clone.jpg',
    technologies: [
      'React',
      'Tailwind CSS',
      'Shadcn UI',
      'Express.js',
      'Socket.io',
      'MongoDB',
      'Mongoose',
      'Redis',
      'JWT Auth',
    ],
    liveUrl: 'https://linkly.swarupdas.dev/',
    githubUrl: 'https://github.com/swarupcs/linkly',
    featured: false,
    category: 'Full Stack',
    year: '2024',
    challenge:
      'Building a real-time messaging system with channels, user presence, and secure authentication while maintaining low latency.',
    solution:
      'Implemented Socket.io for instant communication, Redis for fast caching and presence tracking, MongoDB with Mongoose for structured data models, and JWT-based authentication for secure access.',
  },

  {
    id: 3,
    title: 'Shortify',
    description:
      'A fast and minimal URL shortener built with Next.js, allowing users to generate compact links and track redirections efficiently.',
    image: '/shorturl-nextjs.jpg',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
    ],
    liveUrl: 'https://shortify.swarupdas.dev/',
    githubUrl: 'https://github.com/swarupcs/shortify', // update if needed
    featured: false,
    category: 'Full Stack',
    year: '2024',
    challenge:
      'Implementing unique short code generation and efficient URL redirection.',
    solution:
      'Used Prisma with PostgreSQL for fast DB queries and implemented clean API routes for shortening and redirecting.',
  },

  {
    id: 4,
    title: 'Dev-Collab',
    description:
      'A real-time collaboration platform for developers, supporting instant messaging, project rooms, and a shared workspace.',
    image: '/dev-collab.jpg',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Socket.io',
      'Node.js',
    ],
    liveUrl: 'https://dev-collab.swarupdas.dev/',
    githubUrl: 'https://github.com/swarupcs/dev-collab', // update if needed
    featured: false,
    category: 'Full Stack',
    year: '2024',
    challenge:
      'Handling real-time communication efficiently with minimal latency.',
    solution:
      'Integrated Socket.io with a scalable backend setup and built a clean UI for joining rooms and collaborating instantly.',
  },
];
