'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import {
  AdminCard,
  AdminCardHeader,
  FormField,
  Input,
  Select,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  Badge,
  Toast,
  EmptyState,
  LoadingSpinner,
} from './ui';

interface Skill {
  id?: string;
  name: string;
  category: string;
  level: number;
  icon: string;
}

const BLANK: Skill = { name: '', category: '', level: 75, icon: '' };

const CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Mobile',
  'Tools',
  'Languages',
  'Other',
];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: 'info',
  Backend: 'success',
  Database: 'warning',
  DevOps: 'default',
  Mobile: 'info',
  Tools: 'default',
  Languages: 'success',
  Other: 'default',
};

export default function SkillsEditor() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    fetch('/api/admin/skills')
      .then((r) => r.json())
      .then(setSkills)
      .catch(() =>
        setToast({ message: 'Failed to load skills', type: 'error' }),
      )
      .finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setEditing({ ...BLANK });
    setIsNew(true);
  };
  const openEdit = (s: Skill) => {
    setEditing({ ...s });
    setIsNew(false);
  };
  const closeEditor = () => {
    setEditing(null);
  };

  const set =
    (k: keyof Skill) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setEditing((p) =>
        p
          ? {
              ...p,
              [k]: k === 'level' ? Number(e.target.value) : e.target.value,
            }
          : null,
      );

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/skills', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      if (isNew) setSkills((p) => [saved, ...p]);
      else setSkills((p) => p.map((x) => (x.id === saved.id ? saved : x)));
      closeEditor();
      setToast({
        message: isNew ? 'Skill added!' : 'Skill updated!',
        type: 'success',
      });
    } catch {
      setToast({ message: 'Failed to save skill', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    try {
      const res = await fetch(`/api/admin/skills?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      setSkills((p) => p.filter((x) => x.id !== id));
      setToast({ message: 'Skill deleted', type: 'success' });
    } catch {
      setToast({ message: 'Failed to delete', type: 'error' });
    }
  };

  // Group by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const cat = s.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  if (loading) return <LoadingSpinner />;

  return (
    <div className='space-y-6'>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Editor */}
      {editing && (
        <AdminCard className='ring-1 ring-violet-500/20'>
          <AdminCardHeader
            title={isNew ? 'New Skill' : 'Edit Skill'}
            action={
              <button
                onClick={closeEditor}
                className='text-[#6b7280] hover:text-white transition-colors'
              >
                <X className='w-5 h-5' />
              </button>
            }
          />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <FormField label='Skill Name'>
              <Input
                value={editing.name}
                onChange={set('name')}
                placeholder='React, Node.js, etc.'
              />
            </FormField>
            <FormField label='Category'>
              <Select value={editing.category} onChange={set('category')}>
                <option value=''>Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label='Icon' hint='Emoji or icon class'>
              <Input
                value={editing.icon}
                onChange={set('icon')}
                placeholder='⚛️ or icon name'
              />
            </FormField>
            <FormField label={`Proficiency: ${editing.level}%`}>
              <div className='space-y-2'>
                <input
                  type='range'
                  min={0}
                  max={100}
                  step={5}
                  value={editing.level}
                  onChange={set('level')}
                  className='w-full h-2 bg-[#1a1a2e] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:cursor-pointer'
                />
                <div className='h-2 bg-[#1a1a2e] rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all'
                    style={{ width: `${editing.level}%` }}
                  />
                </div>
              </div>
            </FormField>
          </div>
          <div className='flex justify-end gap-3 mt-5 pt-5 border-t border-[#1a1a2e]'>
            <SecondaryButton onClick={closeEditor}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleSave} loading={saving}>
              <Save className='w-4 h-4' />
              {isNew ? 'Add Skill' : 'Save Changes'}
            </PrimaryButton>
          </div>
        </AdminCard>
      )}

      {/* Skills grouped */}
      <AdminCard>
        <AdminCardHeader
          title='Skills'
          description={`${skills.length} skill${skills.length !== 1 ? 's' : ''} across ${Object.keys(grouped).length} categories`}
          action={
            <SecondaryButton onClick={openNew}>
              <Plus className='w-4 h-4' />
              Add Skill
            </SecondaryButton>
          }
        />
        {skills.length === 0 ? (
          <EmptyState
            title='No skills yet'
            description='Add skills to showcase your expertise'
            action={
              <SecondaryButton onClick={openNew}>
                <Plus className='w-4 h-4' />
                Add Skill
              </SecondaryButton>
            }
          />
        ) : (
          <div className='space-y-6'>
            {Object.entries(grouped).map(([cat, catSkills]) => (
              <div key={cat}>
                <div className='flex items-center gap-2 mb-3'>
                  <Badge
                    variant={
                      (CATEGORY_COLORS[cat] || 'default') as
                        | 'default'
                        | 'success'
                        | 'warning'
                        | 'info'
                    }
                  >
                    {cat}
                  </Badge>
                  <span className='text-xs text-[#4b5563]'>
                    {catSkills.length} skills
                  </span>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                  {catSkills.map((s) => (
                    <div
                      key={s.id}
                      className='flex items-center gap-3 bg-[#0d0d14] border border-[#1f1f2e] rounded-xl px-4 py-3 group hover:border-[#2a2a3e] transition-colors'
                    >
                      {s.icon && (
                        <span className='text-lg shrink-0'>{s.icon}</span>
                      )}
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-white truncate'>
                          {s.name}
                        </p>
                        <div className='flex items-center gap-2 mt-1'>
                          <div className='flex-1 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden'>
                            <div
                              className='h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full'
                              style={{ width: `${s.level}%` }}
                            />
                          </div>
                          <span className='text-xs text-[#6b7280] shrink-0'>
                            {s.level}%
                          </span>
                        </div>
                      </div>
                      <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <SecondaryButton
                          onClick={() => openEdit(s)}
                          className='px-2 py-1.5'
                        >
                          <Edit2 className='w-3.5 h-3.5' />
                        </SecondaryButton>
                        <DangerButton onClick={() => handleDelete(s.id!)}>
                          <Trash2 className='w-3.5 h-3.5' />
                        </DangerButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
