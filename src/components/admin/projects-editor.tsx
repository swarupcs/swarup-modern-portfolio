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
} from 'lucide-react';
import {
  AdminCard,
  AdminCardHeader,
  FormField,
  Input,
  Textarea,
  Select,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  Badge,
  Toast,
  EmptyState,
  LoadingSpinner,
} from './ui';

interface Project {
  id?: string;
  title: string;
  description: string;
  image: string;
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
  image: '',
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
    setEditing({ ...p });
    setIsNew(false);
    setTechInput('');
  };
  const closeEditor = () => {
    setEditing(null);
    setIsNew(false);
  };

  const set =
    (k: keyof Project) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
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

  if (loading) return <LoadingSpinner />;

  return (
    <div className='space-y-6'>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Editor Modal */}
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
            <FormField label='Image URL'>
              <Input
                value={editing.image}
                onChange={set('image')}
                placeholder='https://...'
              />
            </FormField>

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
                        {t}
                        <button
                          onClick={() => removeTech(i)}
                          className='hover:text-red-400 transition-colors'
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

      {/* List */}
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
          <div className='space-y-3'>
            {projects.map((p) => (
              <div
                key={p.id}
                className='flex items-center gap-4 bg-[#0d0d14] border border-[#1f1f2e] rounded-xl px-4 py-3.5 group hover:border-[#2a2a3e] transition-colors'
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    className='w-12 h-10 rounded-lg object-cover shrink-0 border border-[#2a2a3e]'
                  />
                )}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <p className='text-sm font-medium text-white truncate'>
                      {p.title}
                    </p>
                    {p.featured && <Badge variant='warning'>Featured</Badge>}
                    {p.hidden && <Badge variant='default'>Hidden</Badge>}
                    {p.category && <Badge variant='info'>{p.category}</Badge>}
                  </div>
                  <p className='text-xs text-[#6b7280] mt-0.5 truncate'>
                    {p.description}
                  </p>
                  {p.technologies.length > 0 && (
                    <div className='flex gap-1 mt-1.5 flex-wrap'>
                      {p.technologies.slice(0, 4).map((t, i) => (
                        <span
                          key={i}
                          className='text-xs bg-[#1a1a2e] text-[#9ca3af] px-2 py-0.5 rounded-md'
                        >
                          {t}
                        </span>
                      ))}
                      {p.technologies.length > 4 && (
                        <span className='text-xs text-[#4b5563]'>
                          +{p.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <SecondaryButton
                    onClick={() => openEdit(p)}
                    className='px-3 py-2'
                  >
                    <Edit2 className='w-3.5 h-3.5' />
                  </SecondaryButton>
                  <DangerButton onClick={() => handleDelete(p.id!)}>
                    <Trash2 className='w-3.5 h-3.5' />
                  </DangerButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
