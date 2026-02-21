'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Star,
  Eye,
  EyeOff,
  ExternalLink,
  Github,
  FolderOpen,
  Globe,
  Lock,
} from 'lucide-react';
import {
  AdminCard,
  AdminCardHeader,
  FormField,
  Input,
  Textarea,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  Toast,
  EmptyState,
  LoadingSpinner,
} from './ui';
import ImageUploader from './image-uploader';
import { TechBadgeWithIcon } from '@/lib/tech-icons';

interface Project {
  id?: string;
  title: string;
  description: string;
  image: string | null;
  liveUrl: string;
  githubUrl: string;
  category: string;
  featured: boolean;
  hidden: boolean;
  technologies: string[];
}

const BLANK: Project = {
  title: '',
  description: '',
  image: null,
  liveUrl: '',
  githubUrl: '',
  category: '',
  featured: false,
  hidden: false,
  technologies: [],
};

export default function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    fetch('/api/admin/projects')
      .then((r) => r.json())
      .then(setProjects)
      .catch(() =>
        setToast({ message: 'Failed to load projects', type: 'error' }),
      )
      .finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setEditing({ ...BLANK });
    setIsNew(true);
    setTechInput('');
  };
  const openEdit = (p: Project) => {
    setEditing({
      ...p,
      image: p.image ?? null,
      liveUrl: p.liveUrl ?? '',
      githubUrl: p.githubUrl ?? '',
      category: p.category ?? '',
      technologies: p.technologies ?? [],
    });
    setIsNew(false);
    setTechInput('');
  };
  const closeEditor = () => {
    setEditing(null);
    setIsNew(false);
  };

  const set =
    (k: keyof Project) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setEditing((p) => (p ? { ...p, [k]: e.target.value } : null));

  const toggle = (k: 'featured' | 'hidden') =>
    setEditing((p) => (p ? { ...p, [k]: !p[k] } : null));

  const addTech = () => {
    const t = techInput.trim();
    if (!t || !editing) return;
    setEditing((p) =>
      p ? { ...p, technologies: [...p.technologies, t] } : null,
    );
    setTechInput('');
  };

  const removeTech = (idx: number) =>
    setEditing((p) =>
      p
        ? { ...p, technologies: p.technologies.filter((_, i) => i !== idx) }
        : null,
    );

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/projects', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      if (isNew) setProjects((p) => [saved, ...p]);
      else setProjects((p) => p.map((x) => (x.id === saved.id ? saved : x)));
      closeEditor();
      setToast({
        message: isNew ? 'Project created!' : 'Project updated!',
        type: 'success',
      });
    } catch {
      setToast({ message: 'Failed to save project', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      setProjects((p) => p.filter((x) => x.id !== id));
      setToast({ message: 'Project deleted', type: 'success' });
    } catch {
      setToast({ message: 'Failed to delete', type: 'error' });
    }
  };

  const featured = projects.filter((p) => p.featured);
  const hidden = projects.filter((p) => p.hidden);

  if (loading) return <LoadingSpinner />;

  return (
    <div className='space-y-6'>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* ── Stats bar ───────────────────────────────────────────── */}
      <div className='grid grid-cols-3 gap-3'>
        {[
          {
            label: 'Total',
            value: projects.length,
            color: 'text-white',
            bg: 'bg-[#0d0d16] border-[#1a1a2e]',
          },
          {
            label: 'Featured',
            value: featured.length,
            color: 'text-amber-400',
            bg: 'bg-amber-500/5 border-amber-500/20',
          },
          {
            label: 'Hidden',
            value: hidden.length,
            color: 'text-[#6b7280]',
            bg: 'bg-[#0d0d16] border-[#1a1a2e]',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border px-4 py-3 ${stat.bg}`}
          >
            <p className='text-xs text-[#6b7280] mb-1'>{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Editor Modal ────────────────────────────────────────── */}
      {editing && (
        <AdminCard className='ring-1 ring-violet-500/20'>
          <AdminCardHeader
            title={isNew ? 'New Project' : 'Edit Project'}
            description='Fill in the project details below'
            action={
              <button
                onClick={closeEditor}
                className='text-[#6b7280] hover:text-white transition-colors'
              >
                <X className='w-5 h-5' />
              </button>
            }
          />
          <div className='space-y-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <FormField label='Title'>
                <Input
                  value={editing.title}
                  onChange={set('title')}
                  placeholder='Project name'
                />
              </FormField>
              <FormField label='Category'>
                <Input
                  value={editing.category}
                  onChange={set('category')}
                  placeholder='Web App, Mobile, etc.'
                />
              </FormField>
            </div>

            <FormField label='Description'>
              <Textarea
                rows={3}
                value={editing.description}
                onChange={set('description')}
                placeholder='Describe the project...'
              />
            </FormField>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <FormField label='Live URL'>
                <div className='relative'>
                  <ExternalLink className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
                  <Input
                    className='pl-10'
                    value={editing.liveUrl}
                    onChange={set('liveUrl')}
                    placeholder='https://...'
                  />
                </div>
              </FormField>
              <FormField label='GitHub URL'>
                <div className='relative'>
                  <Github className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
                  <Input
                    className='pl-10'
                    value={editing.githubUrl}
                    onChange={set('githubUrl')}
                    placeholder='https://github.com/...'
                  />
                </div>
              </FormField>
            </div>

            {/* ImageKit uploader */}
            <ImageUploader
              value={editing.image}
              onChange={(url) =>
                setEditing((p) => (p ? { ...p, image: url } : null))
              }
              label='Project Thumbnail'
            />

            {/* Technologies */}
            <FormField label='Technologies'>
              <div className='space-y-2'>
                {editing.technologies.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {editing.technologies.map((t, i) => (
                      <span
                        key={i}
                        className='inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs px-2.5 py-1 rounded-lg'
                      >
                        <TechBadgeWithIcon
                          tech={t}
                          className='!bg-transparent !border-0 !px-0 !py-0 !gap-1'
                        />
                        <button
                          onClick={() => removeTech(i)}
                          className='hover:text-red-400 transition-colors ml-1'
                        >
                          <X className='w-3 h-3' />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className='flex gap-2'>
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTech()}
                    placeholder='Add technology (press Enter)'
                    className='flex-1'
                  />
                  <SecondaryButton onClick={addTech}>
                    <Plus className='w-4 h-4' />
                  </SecondaryButton>
                </div>
              </div>
            </FormField>

            {/* Toggles */}
            <div className='flex gap-4 pt-2'>
              <button
                onClick={() => toggle('featured')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  editing.featured
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    : 'bg-[#1a1a2e] border-[#2a2a3e] text-[#6b7280] hover:text-white'
                }`}
              >
                <Star className='w-4 h-4' />
                {editing.featured ? 'Featured' : 'Set Featured'}
              </button>
              <button
                onClick={() => toggle('hidden')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  editing.hidden
                    ? 'bg-red-500/10 border-red-500/20 text-red-400'
                    : 'bg-[#1a1a2e] border-[#2a2a3e] text-[#6b7280] hover:text-white'
                }`}
              >
                {editing.hidden ? (
                  <EyeOff className='w-4 h-4' />
                ) : (
                  <Eye className='w-4 h-4' />
                )}
                {editing.hidden ? 'Hidden' : 'Visible'}
              </button>
            </div>

            <div className='flex justify-end gap-3 pt-2 border-t border-[#1a1a2e]'>
              <SecondaryButton onClick={closeEditor}>Cancel</SecondaryButton>
              <PrimaryButton onClick={handleSave} loading={saving}>
                <Save className='w-4 h-4' />
                {isNew ? 'Create Project' : 'Save Changes'}
              </PrimaryButton>
            </div>
          </div>
        </AdminCard>
      )}

      {/* ── Project List ────────────────────────────────────────── */}
      <AdminCard>
        <AdminCardHeader
          title='Projects'
          description={`${projects.length} project${projects.length !== 1 ? 's' : ''} total`}
          action={
            <SecondaryButton onClick={openNew}>
              <Plus className='w-4 h-4' />
              Add Project
            </SecondaryButton>
          }
        />

        {projects.length === 0 ? (
          <EmptyState
            title='No projects yet'
            description='Add your first project to showcase your work'
            action={
              <SecondaryButton onClick={openNew}>
                <Plus className='w-4 h-4' />
                Add Project
              </SecondaryButton>
            }
          />
        ) : (
          <div className='space-y-4'>
            {projects.map((p) => (
              <div
                key={p.id}
                className={`group relative rounded-2xl border overflow-hidden transition-all duration-200 hover:border-[#2a2a3e]
                  ${
                    p.featured
                      ? 'border-amber-500/30 bg-gradient-to-r from-amber-500/5 via-[#0d0d14] to-[#0d0d14]'
                      : 'border-[#1f1f2e] bg-[#0d0d14]'
                  }`}
              >
                {/* Featured glow line */}
                {p.featured && (
                  <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-amber-500/0 via-amber-500/60 to-amber-500/0' />
                )}

                <div className='flex gap-0'>
                  {/* Thumbnail */}
                  <div className='w-48 shrink-0 relative overflow-hidden'>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        className='w-full h-full object-cover'
                        style={{ minHeight: '140px' }}
                      />
                    ) : (
                      <div
                        className='w-full flex items-center justify-center bg-[#111119] border-r border-[#1f1f2e]'
                        style={{ minHeight: '140px' }}
                      >
                        <div className='text-center'>
                          <FolderOpen className='w-8 h-8 text-[#2a2a3e] mx-auto mb-1' />
                          <p className='text-xs text-[#374151]'>No image</p>
                        </div>
                      </div>
                    )}
                    {/* Image overlay on hover */}
                    <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                      <button
                        onClick={() => openEdit(p)}
                        className='px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium backdrop-blur-sm transition-colors'
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='flex-1 p-4 min-w-0'>
                    <div className='flex items-start justify-between gap-3'>
                      <div className='flex-1 min-w-0'>
                        {/* Title + badges */}
                        <div className='flex items-center gap-2 flex-wrap mb-1'>
                          <h3 className='text-base font-bold text-white'>
                            {p.title}
                          </h3>
                          {p.featured && (
                            <span className='inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-medium'>
                              <Star className='w-3 h-3' />
                              Featured
                            </span>
                          )}
                          {p.hidden && (
                            <span className='inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#1a1a2e] border border-[#2a2a3e] text-[#6b7280] font-medium'>
                              <Lock className='w-3 h-3' />
                              Hidden
                            </span>
                          )}
                          {p.category && (
                            <span className='text-xs px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400'>
                              {p.category}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className='text-xs text-[#6b7280] line-clamp-2 mb-3'>
                          {p.description}
                        </p>

                        {/* Tech badges with icons */}
                        {p.technologies.length > 0 && (
                          <div className='flex flex-wrap gap-1.5'>
                            {p.technologies.slice(0, 5).map((t, i) => (
                              <TechBadgeWithIcon
                                key={i}
                                tech={t}
                                className='text-xs !py-0.5 !px-2'
                              />
                            ))}
                            {p.technologies.length > 5 && (
                              <span className='inline-flex items-center text-xs px-2 py-0.5 rounded-md bg-[#1a1a2e] text-[#4b5563] border border-[#2a2a3e]'>
                                +{p.technologies.length - 5} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className='flex flex-col gap-1.5 shrink-0'>
                        {/* Quick links */}
                        <div className='flex gap-1'>
                          {p.liveUrl && (
                            <a
                              href={p.liveUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='p-1.5 rounded-lg text-[#6b7280] hover:text-cyan-400 hover:bg-cyan-500/10 transition-all'
                              title='View Live'
                            >
                              <Globe className='w-3.5 h-3.5' />
                            </a>
                          )}
                          {p.githubUrl && (
                            <a
                              href={p.githubUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='p-1.5 rounded-lg text-[#6b7280] hover:text-white hover:bg-[#1a1a2e] transition-all'
                              title='View GitHub'
                            >
                              <Github className='w-3.5 h-3.5' />
                            </a>
                          )}
                        </div>
                        {/* Edit / Delete */}
                        <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                          <button
                            onClick={() => openEdit(p)}
                            className='p-1.5 rounded-lg text-[#6b7280] hover:text-white hover:bg-[#1a1a2e] transition-all'
                            title='Edit'
                          >
                            <Edit2 className='w-3.5 h-3.5' />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id!)}
                            className='p-1.5 rounded-lg text-[#6b7280] hover:text-red-400 hover:bg-red-500/10 transition-all'
                            title='Delete'
                          >
                            <Trash2 className='w-3.5 h-3.5' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
