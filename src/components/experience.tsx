"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import SectionHeading from "./section-heading"

// Sample experience data - replace with your own
const experienceData = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "Tech Company",
    duration: "Jan 2022 - Present",
    description:
      "Led the development of the company's main product, improving performance by 40%. Mentored junior developers and implemented best practices.",
    skills: ["React", "TypeScript", "Next.js", "Redux"],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Digital Agency",
    duration: "Mar 2020 - Dec 2021",
    description:
      "Developed responsive web applications for various clients. Collaborated with designers and backend developers to deliver high-quality products.",
    skills: ["JavaScript", "React", "CSS", "REST APIs"],
  },
  {
    id: 3,
    role: "Web Development Intern",
    company: "Startup Inc.",
    duration: "Jun 2019 - Feb 2020",
    description:
      "Assisted in developing and maintaining the company website. Learned modern web development practices and tools.",
    skills: ["HTML", "CSS", "JavaScript", "Git"],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <SectionHeading title="Experience" description="My professional journey and work experience" />
        <div className="mx-auto mt-12 max-w-3xl space-y-0">
          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.id}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Timeline connector */}
              {index < experienceData.length - 1 && (
                <motion.div
                  className="absolute left-[15px] top-[40px] bottom-0 w-[2px] bg-primary/20 md:left-1/2 md:ml-[-1px] md:top-[28px]"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              )}

              <div className="flex flex-col md:flex-row md:items-start md:gap-8 pb-10">
                <div className="mb-4 hidden md:block md:w-1/2 md:text-right md:pr-8 pt-1">
                  <span className="text-sm font-medium text-muted-foreground">{experience.duration}</span>
                </div>

                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-1.5 h-8 w-8 rounded-full border-4 border-background bg-primary md:left-1/2 md:ml-[-16px] md:top-1"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.2 }}
                />

                <div className="pl-12 md:pl-0 md:w-1/2 md:pl-8">
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Card className="border-2 border-transparent hover:border-primary/20">
                      <CardHeader>
                        <div className="space-y-1">
                          <CardTitle>{experience.role}</CardTitle>
                          <CardDescription className="flex flex-col gap-1">
                            <span className="font-medium">{experience.company}</span>
                            <span className="md:hidden">{experience.duration}</span>
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">{experience.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
