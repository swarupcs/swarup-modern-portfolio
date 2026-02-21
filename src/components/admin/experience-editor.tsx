'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Briefcase } from 'lucide-react';
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

interface Experience {
  id?: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
}

const BLANK: Experience = {
  role: '',
  company: '',
  duration: '',
  description: '',
  skills: [],
};

export default function ExperienceEditor() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    fetch('/api/admin/experience')
      .then((r) => r.json())
      .then(setItems)
      .catch(() =>
        setToast({ message: 'Failed to load experience', type: 'error' }),
      )
      .finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setEditing({ ...BLANK });
    setIsNew(true);
    setSkillInput('');
  };
  const openEdit = (e: Experience) => {
    setEditing({
      ...e,
      description: e.description ?? '',
      skills: e.skills ?? [],
    });
    setIsNew(false);
    setSkillInput('');
  };
  const closeEditor = () => {
    setEditing(null);
  };

  const set =
    (k: keyof Experience) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setEditing((p) => (p ? { ...p, [k]: e.target.value } : null));

  const addSkill = () => {
    const t = skillInput.trim();
    if (!t || !editing) return;
    setEditing((p) => (p ? { ...p, skills: [...(p.skills ?? []), t] } : null));
    setSkillInput('');
  };

  const removeSkill = (idx: number) =>
    setEditing((p) =>
      p ? { ...p, skills: p.skills.filter((_, i) => i !== idx) } : null,
    );

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/experience', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      if (isNew) setItems((p) => [saved, ...p]);
      else setItems((p) => p.map((x) => (x.id === saved.id ? saved : x)));
      closeEditor();
      setToast({
        message: isNew ? 'Experience added!' : 'Experience updated!',
        type: 'success',
      });
    } catch {
      setToast({ message: 'Failed to save', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    try {
      const res = await fetch(`/api/admin/experience?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      setItems((p) => p.filter((x) => x.id !== id));
      setToast({ message: 'Experience deleted', type: 'success' });
    } catch {
      setToast({ message: 'Failed to delete', type: 'error' });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className='space-y-6'>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Editor */}
      {editing && (
        <AdminCard className='ring-1 ring-violet-500/20'>
          <AdminCardHeader
            title={isNew ? 'New Experience' : 'Edit Experience'}
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
              <FormField label='Role / Position'>
                <Input
                  value={editing.role}
                  onChange={set('role')}
                  placeholder='Senior Developer'
                />
              </FormField>
              <FormField label='Company'>
                <Input
                  value={editing.company}
                  onChange={set('company')}
                  placeholder='Acme Corp'
                />
              </FormField>
              <FormField label='Duration'>
                <Input
                  value={editing.duration}
                  onChange={set('duration')}
                  placeholder='Jan 2022 – Present'
                />
              </FormField>
            </div>
            <FormField label='Description'>
              <Textarea
                rows={4}
                value={editing.description}
                onChange={set('description')}
                placeholder='Describe your responsibilities and achievements...'
              />
            </FormField>
            <FormField label='Skills Used'>
              <div className='space-y-2'>
                {(editing.skills?.length ?? 0) > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {editing.skills.map((s, i) => (
                      <span
                        key={i}
                        className='inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs px-2.5 py-1 rounded-lg'
                      >
                        {s}
                        <button
                          onClick={() => removeSkill(i)}
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
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                    placeholder='Add skill (press Enter)'
                    className='flex-1'
                  />
                  <SecondaryButton onClick={addSkill}>
                    <Plus className='w-4 h-4' />
                  </SecondaryButton>
                </div>
              </div>
            </FormField>
            <div className='flex justify-end gap-3 pt-2 border-t border-[#1a1a2e]'>
              <SecondaryButton onClick={closeEditor}>Cancel</SecondaryButton>
              <PrimaryButton onClick={handleSave} loading={saving}>
                <Save className='w-4 h-4' />
                {isNew ? 'Add Experience' : 'Save Changes'}
              </PrimaryButton>
            </div>
          </div>
        </AdminCard>
      )}

      {/* List */}
      <AdminCard>
        <AdminCardHeader
          title='Work Experience'
          description={`${items.length} position${items.length !== 1 ? 's' : ''}`}
          action={
            <SecondaryButton onClick={openNew}>
              <Plus className='w-4 h-4' />
              Add Experience
            </SecondaryButton>
          }
        />
        {items.length === 0 ? (
          <EmptyState
            title='No experience entries yet'
            description='Add your work history to showcase your career'
            action={
              <SecondaryButton onClick={openNew}>
                <Plus className='w-4 h-4' />
                Add Experience
              </SecondaryButton>
            }
          />
        ) : (
          <div className='space-y-3'>
            {items.map((item) => (
              <div
                key={item.id}
                className='flex gap-4 bg-[#0d0d14] border border-[#1f1f2e] rounded-xl px-4 py-4 group hover:border-[#2a2a3e] transition-colors'
              >
                <div className='w-10 h-10 rounded-xl bg-[#1a1a2e] border border-[#2a2a3e] flex items-center justify-center shrink-0'>
                  <Briefcase className='w-4 h-4 text-[#6b7280]' />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <p className='text-sm font-semibold text-white'>
                        {item.role}
                      </p>
                      <p className='text-sm text-violet-400'>{item.company}</p>
                      <p className='text-xs text-[#6b7280] mt-0.5'>
                        {item.duration}
                      </p>
                    </div>
                    <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0'>
                      <SecondaryButton
                        onClick={() => openEdit(item)}
                        className='px-3 py-2'
                      >
                        <Edit2 className='w-3.5 h-3.5' />
                      </SecondaryButton>
                      <DangerButton onClick={() => handleDelete(item.id!)}>
                        <Trash2 className='w-3.5 h-3.5' />
                      </DangerButton>
                    </div>
                  </div>
                  {item.description && (
                    <p className='text-xs text-[#9ca3af] mt-2 line-clamp-2'>
                      {item.description}
                    </p>
                  )}
                  {(item.skills?.length ?? 0) > 0 && (
                    <div className='flex flex-wrap gap-1 mt-2'>
                      {(item.skills ?? []).map((s, i) => (
                        <span
                          key={i}
                          className='text-xs bg-[#1a1a2e] text-[#9ca3af] px-2 py-0.5 rounded-md'
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
