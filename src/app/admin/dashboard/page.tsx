'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  LogOut,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  Mail,
} from 'lucide-react';
import PersonalInfoEditor from '@/components/admin/personal-info-editor';
import ProjectsEditor from '@/components/admin/projects-editor';
import SkillsEditor from '@/components/admin/skills-editor';
import ExperienceEditor from '@/components/admin/experience-editor';
import EducationEditor from '@/components/admin/education-editor';
import ContactEditor from '@/components/admin/contact-editor';
import AboutEditor from '@/components/admin/about-editor';


export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className='min-h-screen bg-muted/30'>
      <header className='border-b bg-background sticky top-0 z-10'>
        <div className='container flex h-16 items-center justify-between px-4'>
          <h1 className='text-2xl font-bold'>Portfolio Admin Dashboard</h1>
          <div className='flex items-center gap-4'>
            <Button variant='outline' onClick={() => router.push('/')}>
              View Portfolio
            </Button>
            <Button variant='outline' onClick={handleLogout}>
              <LogOut className='mr-2 h-4 w-4' />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className='container px-4 py-8'>
        <Tabs defaultValue='personal' className='space-y-6'>
          <TabsList className='grid w-full grid-cols-2 lg:grid-cols-7'>
            <TabsTrigger value='personal'>
              <User className='mr-2 h-4 w-4' />
              Personal
            </TabsTrigger>
            <TabsTrigger value='about'>
              <User className='mr-2 h-4 w-4' />
              About
            </TabsTrigger>
            <TabsTrigger value='projects'>
              <FolderOpen className='mr-2 h-4 w-4' />
              Projects
            </TabsTrigger>
            <TabsTrigger value='skills'>
              <Code className='mr-2 h-4 w-4' />
              Skills
            </TabsTrigger>
            <TabsTrigger value='experience'>
              <Briefcase className='mr-2 h-4 w-4' />
              Experience
            </TabsTrigger>
            <TabsTrigger value='education'>
              <GraduationCap className='mr-2 h-4 w-4' />
              Education
            </TabsTrigger>
            <TabsTrigger value='contact'>
              <Mail className='mr-2 h-4 w-4' />
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value='personal'>
            <PersonalInfoEditor />
          </TabsContent>

          <TabsContent value='about'>
            <AboutEditor />
          </TabsContent>

          <TabsContent value='projects'>
            <ProjectsEditor />
          </TabsContent>

          <TabsContent value='skills'>
            <SkillsEditor />
          </TabsContent>

          <TabsContent value='experience'>
            <ExperienceEditor />
          </TabsContent>

          <TabsContent value='education'>
            <EducationEditor />
          </TabsContent>

          <TabsContent value='contact'>
            <ContactEditor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
