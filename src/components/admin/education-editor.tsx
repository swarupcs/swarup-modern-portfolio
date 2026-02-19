'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, GraduationCap } from 'lucide-react';
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

interface Education {
  id?: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
  grade: string;
}

const BLANK: Education = {
  degree: '',
  institution: '',
  duration: '',
  description: '',
  grade: '',
};

export default function EducationEditor() {
  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Education | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    fetch('/api/admin/education')
      .then((r) => r.json())
      .then(setItems)
      .catch(() =>
        setToast({ message: 'Failed to load education', type: 'error' }),
      )
      .finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setEditing({ ...BLANK });
    setIsNew(true);
  };
  const openEdit = (e: Education) => {
    setEditing({
      ...e,
      description: e.description ?? '',
      grade: e.grade ?? '',
    });
    setIsNew(false);
  };
  const closeEditor = () => {
    setEditing(null);
  };

  const set =
    (k: keyof Education) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setEditing((p) => (p ? { ...p, [k]: e.target.value } : null));

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/education', {
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
        message: isNew ? 'Education added!' : 'Education updated!',
        type: 'success',
      });
    } catch {
      setToast({ message: 'Failed to save', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this education entry?')) return;
    try {
      const res = await fetch(`/api/admin/education?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      setItems((p) => p.filter((x) => x.id !== id));
      setToast({ message: 'Deleted successfully', type: 'success' });
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
            title={isNew ? 'New Education' : 'Edit Education'}
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
              <FormField label='Degree / Certificate'>
                <Input
                  value={editing.degree}
                  onChange={set('degree')}
                  placeholder='B.S. Computer Science'
                />
              </FormField>
              <FormField label='Institution'>
                <Input
                  value={editing.institution}
                  onChange={set('institution')}
                  placeholder='MIT'
                />
              </FormField>
              <FormField label='Duration'>
                <Input
                  value={editing.duration}
                  onChange={set('duration')}
                  placeholder='2018 – 2022'
                />
              </FormField>
              <FormField label='Grade / GPA'>
                <Input
                  value={editing.grade}
                  onChange={set('grade')}
                  placeholder='3.9 / 4.0 or First Class'
                />
              </FormField>
            </div>
            <FormField label='Description'>
              <Textarea
                rows={3}
                value={editing.description}
                onChange={set('description')}
                placeholder='Relevant coursework, achievements, activities...'
              />
            </FormField>
            <div className='flex justify-end gap-3 pt-2 border-t border-[#1a1a2e]'>
              <SecondaryButton onClick={closeEditor}>Cancel</SecondaryButton>
              <PrimaryButton onClick={handleSave} loading={saving}>
                <Save className='w-4 h-4' />
                {isNew ? 'Add Education' : 'Save Changes'}
              </PrimaryButton>
            </div>
          </div>
        </AdminCard>
      )}

      {/* List */}
      <AdminCard>
        <AdminCardHeader
          title='Education'
          description={`${items.length} entr${items.length !== 1 ? 'ies' : 'y'}`}
          action={
            <SecondaryButton onClick={openNew}>
              <Plus className='w-4 h-4' />
              Add Education
            </SecondaryButton>
          }
        />
        {items.length === 0 ? (
          <EmptyState
            title='No education entries yet'
            description='Add your academic background'
            action={
              <SecondaryButton onClick={openNew}>
                <Plus className='w-4 h-4' />
                Add Education
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
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center shrink-0'>
                  <GraduationCap className='w-4 h-4 text-violet-400' />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <p className='text-sm font-semibold text-white'>
                        {item.degree}
                      </p>
                      <p className='text-sm text-cyan-400'>
                        {item.institution}
                      </p>
                      <div className='flex items-center gap-3 mt-0.5'>
                        <p className='text-xs text-[#6b7280]'>
                          {item.duration}
                        </p>
                        {item.grade && (
                          <span className='text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md'>
                            {item.grade}
                          </span>
                        )}
                      </div>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
