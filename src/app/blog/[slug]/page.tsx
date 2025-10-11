"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// This would typically come from a CMS or database
const blogPost = {
  title: "Building Scalable React Applications",
  description:
    "Learn best practices for structuring large React applications with proper state management and component architecture.",
  image: "/placeholder.svg?height=600&width=1200",
  date: "2024-01-15",
  readTime: "8 min read",
  category: "React",
  tags: ["React", "Architecture", "Best Practices"],
  content: `
# Building Scalable React Applications

When building large-scale React applications, proper architecture and planning are crucial for long-term maintainability and scalability.

## Component Structure

Organizing your components in a logical folder structure is the first step:

\`\`\`
src/
  components/
    common/
    features/
    layouts/
  hooks/
  utils/
  types/
\`\`\`

## State Management

Choose the right state management solution for your needs:

- **Local State**: Use for component-specific data
- **Context API**: For sharing data across components
- **Redux/Zustand**: For complex global state

## Best Practices

1. **Keep Components Small**: Break down large components into smaller, reusable pieces
2. **Use Custom Hooks**: Extract logic into custom hooks for reusability
3. **TypeScript**: Use TypeScript for better type safety and developer experience
4. **Code Splitting**: Lazy load components to improve initial load time

## Conclusion

Building scalable React applications requires careful planning and adherence to best practices. By following these guidelines, you can create maintainable and performant applications.
  `,
}

export default function BlogPostPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <article className="container px-4 md:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Featured Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} fill className="object-cover" />
          </div>

          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge className="bg-primary">{blogPost.category}</Badge>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blogPost.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">{blogPost.title}</h1>
            <p className="text-xl text-muted-foreground">{blogPost.description}</p>

            <div className="flex items-center gap-2">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, "<br/>") }} />
          </div>
        </motion.div>
      </article>
    </div>
  )
}
