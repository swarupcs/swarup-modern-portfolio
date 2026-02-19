'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, X } from 'lucide-react';
import {
  AdminCard,
  AdminCardHeader,
  FormField,
  Input,
  Textarea,
  PrimaryButton,
  SecondaryButton,
  Toast,
  LoadingSpinner,
} from './ui';

interface About {
  id?: string;
  bio: string;
  description: string;
  highlights: string[];
}

export default function AboutEditor() {
  const [data, setData] = useState<About>({
    bio: '',
    description: '',
    highlights: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newHighlight, setNewHighlight] = useState('');
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    fetch('/api/admin/about')
      .then((r) => r.json())
      .then((d) => {
        if (d) {
          setData({
            id: d.id,
            bio: d.bio ?? '',
            description: d.description ?? '',
            highlights: d.highlights ?? [],
          });
        }
      })
      .catch(() => setToast({ message: 'Failed to load data', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  const addHighlight = () => {
    const trimmed = newHighlight.trim();
    if (!trimmed) return;
    setData((p) => ({ ...p, highlights: [...p.highlights, trimmed] }));
    setNewHighlight('');
  };

  const removeHighlight = (idx: number) => {
    setData((p) => ({
      ...p,
      highlights: p.highlights.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setData(updated);
      setToast({ message: 'About section saved!', type: 'success' });
    } catch {
      setToast({ message: 'Failed to save. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className='space-y-6'>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <AdminCard>
        <AdminCardHeader
          title='About Content'
          description='Your bio and professional summary'
        />
        <div className='space-y-5'>
          <FormField label='Bio' hint='A concise personal introduction'>
            <Textarea
              rows={3}
              value={data.bio}
              onChange={(e) => setData((p) => ({ ...p, bio: e.target.value }))}
              placeholder="I'm a passionate developer..."
            />
          </FormField>
          <FormField
            label='Extended Description'
            hint='Detailed description shown on your about page'
          >
            <Textarea
              rows={5}
              value={data.description}
              onChange={(e) =>
                setData((p) => ({ ...p, description: e.target.value }))
              }
              placeholder='Write more about your background, interests, and goals...'
            />
          </FormField>
        </div>
      </AdminCard>

      <AdminCard>
        <AdminCardHeader
          title='Highlights'
          description='Key achievements or facts about you'
        />
        <div className='space-y-4'>
          {/* List */}
          {data.highlights.length > 0 && (
            <div className='space-y-2'>
              {data.highlights.map((h, i) => (
                <div
                  key={i}
                  className='flex items-center gap-3 bg-[#0d0d14] border border-[#1f1f2e] rounded-xl px-4 py-2.5 group'
                >
                  <div className='w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0' />
                  <span className='text-sm text-[#d1d5db] flex-1'>{h}</span>
                  <button
                    onClick={() => removeHighlight(i)}
                    className='text-[#4b5563] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100'
                  >
                    <X className='w-4 h-4' />
                  </button>
                </div>
              ))}
            </div>
          )}
          {/* Add new */}
          <div className='flex gap-2'>
            <Input
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addHighlight()}
              placeholder='Add a highlight (press Enter)'
              className='flex-1'
            />
            <SecondaryButton onClick={addHighlight}>
              <Plus className='w-4 h-4' />
              Add
            </SecondaryButton>
          </div>
        </div>
      </AdminCard>

      <div className='flex justify-end'>
        <PrimaryButton onClick={handleSave} loading={saving}>
          <Save className='w-4 h-4' />
          Save Changes
        </PrimaryButton>
      </div>
    </div>
  );
}
