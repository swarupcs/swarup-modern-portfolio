'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  slug: string;
}

const blogPosts: BlogPost[] = [
  // {
  //   id: 1,
  //   title: "Building Scalable React Applications",
  //   description:
  //     "Learn best practices for structuring large React applications with proper state management and component architecture.",
  //   image: "/placeholder.svg?height=400&width=600",
  //   date: "2024-01-15",
  //   readTime: "8 min read",
  //   category: "React",
  //   tags: ["React", "Architecture", "Best Practices"],
  //   slug: "building-scalable-react-applications",
  // },
  // {
  //   id: 2,
  //   title: "Next.js 14: What's New",
  //   description:
  //     "Exploring the latest features in Next.js 14 including Server Actions, improved caching, and partial prerendering.",
  //   image: "/placeholder.svg?height=400&width=600",
  //   date: "2024-01-10",
  //   readTime: "6 min read",
  //   category: "Next.js",
  //   tags: ["Next.js", "JavaScript", "Web Development"],
  //   slug: "nextjs-14-whats-new",
  // },
  // {
  //   id: 3,
  //   title: "TypeScript Tips for Better Code",
  //   description: "Advanced TypeScript techniques to write more type-safe and maintainable code in your projects.",
  //   image: "/placeholder.svg?height=400&width=600",
  //   date: "2024-01-05",
  //   readTime: "10 min read",
  //   category: "TypeScript",
  //   tags: ["TypeScript", "JavaScript", "Programming"],
  //   slug: "typescript-tips-for-better-code",
  // },
  // {
  //   id: 4,
  //   title: "Mastering CSS Grid and Flexbox",
  //   description: "A comprehensive guide to modern CSS layout techniques with practical examples and use cases.",
  //   image: "/placeholder.svg?height=400&width=600",
  //   date: "2023-12-28",
  //   readTime: "12 min read",
  //   category: "CSS",
  //   tags: ["CSS", "Web Design", "Frontend"],
  //   slug: "mastering-css-grid-flexbox",
  // },
  // {
  //   id: 5,
  //   title: "API Design Best Practices",
  //   description:
  //     "Essential principles for designing RESTful APIs that are scalable, maintainable, and developer-friendly.",
  //   image: "/placeholder.svg?height=400&width=600",
  //   date: "2023-12-20",
  //   readTime: "9 min read",
  //   category: "Backend",
  //   tags: ["API", "Backend", "Node.js"],
  //   slug: "api-design-best-practices",
  // },
  // {
  //   id: 6,
  //   title: "State Management in Modern React",
  //   description: "Comparing different state management solutions in React: Context API, Redux, Zustand, and more.",
  //   image: "/placeholder.svg?height=400&width=600",
  //   date: "2023-12-15",
  //   readTime: "11 min read",
  //   category: "React",
  //   tags: ["React", "State Management", "Redux"],
  //   slug: "state-management-modern-react",
  // },
];

export default function BlogPage() {
  return (
    <div className='min-h-screen pt-24 pb-20'>
      <div className='px-4 md:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-12'
        >
          {/* Header */}
          <div className='space-y-4 text-center'>
            <h1 className='text-4xl md:text-5xl font-bold'>Blog</h1>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Thoughts on software development, design, and technology
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className='overflow-hidden h-full hover:shadow-lg transition-shadow duration-300 group'>
                    <div className='relative aspect-video overflow-hidden'>
                      <Image
                        src={post.image || '/placeholder.svg'}
                        alt={post.title}
                        fill
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                      <div className='absolute top-4 left-4'>
                        <Badge className='bg-primary'>{post.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className='flex items-center gap-4 text-sm text-muted-foreground mb-2'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          <span>
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='h-4 w-4' />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <CardTitle className='line-clamp-2 group-hover:text-primary transition-colors'>
                        {post.title}
                      </CardTitle>
                      <CardDescription className='line-clamp-3'>
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='flex flex-wrap gap-2'>
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant='secondary'>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className='mt-4 flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all'>
                        Read more{' '}
                        <ArrowRight className='h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform' />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
