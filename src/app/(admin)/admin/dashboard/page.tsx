'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  Mail,
  LayoutDashboard,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import PersonalInfoEditor from '@/components/admin/personal-info-editor';
import ProjectsEditor from '@/components/admin/projects-editor';
import SkillsEditor from '@/components/admin/skills-editor';
import ExperienceEditor from '@/components/admin/experience-editor';
import EducationEditor from '@/components/admin/education-editor';
import ContactEditor from '@/components/admin/contact-editor';
import AboutEditor from '@/components/admin/about-editor';

const NAV_ITEMS = [
  {
    id: 'personal',
    label: 'Personal Info',
    icon: User,
    description: 'Name, title, social links',
  },
  {
    id: 'about',
    label: 'About',
    icon: BookOpen,
    description: 'Bio and highlights',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderOpen,
    description: 'Portfolio projects',
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: Code,
    description: 'Technical skills',
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: Briefcase,
    description: 'Work history',
  },
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    description: 'Academic background',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    description: 'Messages received',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  if (!isAuthenticated) return null;

  const activeItem = NAV_ITEMS.find((n) => n.id === activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoEditor />;
      case 'about':
        return <AboutEditor />;
      case 'projects':
        return <ProjectsEditor />;
      case 'skills':
        return <SkillsEditor />;
      case 'experience':
        return <ExperienceEditor />;
      case 'education':
        return <EducationEditor />;
      case 'contact':
        return <ContactEditor />;
      default:
        return null;
    }
  };

  return (
    <div
      className='min-h-screen bg-[#0a0a0f] flex'
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 flex flex-col bg-[#0d0d16] border-r border-[#1a1a2e] shrink-0 sticky top-0 h-screen overflow-hidden`}
      >
        {/* Logo */}
        <div className='h-16 flex items-center px-4 border-b border-[#1a1a2e] gap-3 shrink-0'>
          <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shrink-0'>
            <LayoutDashboard className='w-4 h-4 text-white' />
          </div>
          {sidebarOpen && (
            <span className='font-bold text-white text-sm tracking-tight whitespace-nowrap overflow-hidden'>
              Portfolio Admin
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className='flex-1 py-4 px-2 space-y-1 overflow-y-auto'>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600/20 to-cyan-600/10 border border-violet-500/20 text-violet-300'
                    : 'text-[#6b7280] hover:text-[#d1d5db] hover:bg-[#14141f]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${isActive ? 'text-violet-400' : ''}`}
                />
                {sidebarOpen && (
                  <div className='overflow-hidden'>
                    <p className='text-sm font-medium whitespace-nowrap'>
                      {item.label}
                    </p>
                    {isActive && (
                      <p className='text-xs text-[#6b7280] whitespace-nowrap'>
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
                {isActive && sidebarOpen && (
                  <ChevronRight className='w-3 h-3 ml-auto text-violet-400 shrink-0' />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className='p-2 border-t border-[#1a1a2e] space-y-1 shrink-0'>
          <button
            onClick={() => router.push('/')}
            className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#6b7280] hover:text-[#d1d5db] hover:bg-[#14141f] transition-all'
          >
            <ExternalLink className='w-4 h-4 shrink-0' />
            {sidebarOpen && (
              <span className='text-sm whitespace-nowrap'>View Portfolio</span>
            )}
          </button>
          <button
            onClick={handleLogout}
            className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#6b7280] hover:text-red-400 hover:bg-red-500/10 transition-all'
          >
            <LogOut className='w-4 h-4 shrink-0' />
            {sidebarOpen && (
              <span className='text-sm whitespace-nowrap'>Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        {/* Topbar */}
        <header className='h-16 bg-[#0d0d16] border-b border-[#1a1a2e] flex items-center px-6 gap-4 sticky top-0 z-10 shrink-0'>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='text-[#6b7280] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#1a1a2e]'
          >
            <div className='space-y-1.5'>
              <span
                className={`block h-0.5 bg-current transition-all ${sidebarOpen ? 'w-5' : 'w-4'}`}
              />
              <span className='block h-0.5 bg-current w-5' />
              <span
                className={`block h-0.5 bg-current transition-all ${sidebarOpen ? 'w-5' : 'w-3'}`}
              />
            </div>
          </button>

          {activeItem && (
            <div className='flex items-center gap-2 text-sm'>
              <span className='text-[#4b5563]'>Dashboard</span>
              <ChevronRight className='w-3.5 h-3.5 text-[#374151]' />
              <span className='text-white font-medium'>{activeItem.label}</span>
            </div>
          )}
        </header>

        {/* Content */}
        <main className='flex-1 overflow-y-auto p-6 lg:p-8'>
          {/* Section Header */}
          {activeItem && (
            <div className='mb-8'>
              <div className='flex items-center gap-3 mb-1'>
                <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center'>
                  <activeItem.icon className='w-4 h-4 text-violet-400' />
                </div>
                <h1 className='text-xl font-bold text-white'>
                  {activeItem.label}
                </h1>
              </div>
              <p className='text-[#6b7280] text-sm ml-11'>
                {activeItem.description}
              </p>
            </div>
          )}

          <div className='max-w-5xl'>{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
