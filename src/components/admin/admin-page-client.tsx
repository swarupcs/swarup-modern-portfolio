'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminPasswordModal } from './admin-password-modal';
import AdminPersonalInfo from './admin-personal-info';
import AdminExperience from './admin-experience';
import AdminProjects from './admin-projects';
import AdminSkills from './admin-skills';


export default function AdminPageClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user was authenticated in this session
    const auth =
      typeof window !== 'undefined' && sessionStorage.getItem('adminAuth');
    setIsAuthenticated(!!auth);
  }, []);

  const handlePasswordSuccess = () => {
    sessionStorage.setItem('adminAuth', 'true');
    setIsAuthenticated(true);
  };

  if (!mounted) {
    return <div className='min-h-screen bg-background' />;
  }

  return (
    <>
      <AdminPasswordModal
        isOpen={!isAuthenticated}
        onSuccess={handlePasswordSuccess}
      />

      {isAuthenticated && (
        <div className='min-h-screen bg-background pt-24 md:pt-32'>
          <div className='container px-4 md:px-6 max-w-6xl mx-auto py-8 md:py-12'>
            <div className='mb-8'>
              <h1 className='text-4xl md:text-5xl font-bold mb-2'>
                Admin Panel
              </h1>
              <p className='text-muted-foreground'>
                Manage your portfolio content and settings
              </p>
            </div>

            <Tabs defaultValue='personal' className='space-y-6'>
              <TabsList className='grid w-full grid-cols-4'>
                <TabsTrigger value='personal'>Personal Info</TabsTrigger>
                <TabsTrigger value='experience'>Experience</TabsTrigger>
                <TabsTrigger value='projects'>Projects</TabsTrigger>
                <TabsTrigger value='skills'>Skills</TabsTrigger>
              </TabsList>

              <TabsContent value='personal' className='space-y-4'>
                <AdminPersonalInfo />
              </TabsContent>

              <TabsContent value='experience' className='space-y-4'>
                <AdminExperience />
              </TabsContent>

              <TabsContent value='projects' className='space-y-4'>
                <AdminProjects />
              </TabsContent>

              <TabsContent value='skills' className='space-y-4'>
                <AdminSkills />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
}
