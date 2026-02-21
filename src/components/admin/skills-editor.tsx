'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Layers } from 'lucide-react';
import {
  AdminCard,
  AdminCardHeader,
  FormField,
  Input,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  Toast,
  EmptyState,
  LoadingSpinner,
} from './ui';
import { techIconsWithColors } from '@/lib/tech-icons';

interface Skill {
  id?: string;
  name: string;
  category: string;
  level: number;
  icon: string | null;
}

const BLANK: Skill = {
  name: '',
  category: 'Frontend',
  level: 80,
  icon: null,
};

const CATEGORIES = [
  'Frontend',
  'Backend',
  'Tools & Platforms',
  'Data & ML',
  'Other',
];

const CATEGORY_COLORS: Record<
  string,
  { bg: string; border: string; text: string; dot: string }
> = {
  Frontend: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    text: 'text-violet-300',
    dot: 'bg-violet-400',
  },
  Backend: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    text: 'text-cyan-300',
    dot: 'bg-cyan-400',
  },
  'Tools & Platforms': {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-300',
    dot: 'bg-amber-400',
  },
  'Data & ML': {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    text: 'text-green-300',
    dot: 'bg-green-400',
  },
  Other: {
    bg: 'bg-[#1a1a2e]',
    border: 'border-[#2a2a3e]',
    text: 'text-[#9ca3af]',
    dot: 'bg-[#6b7280]',
  },
};

function getLevelLabel(level: number) {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 55) return 'Intermediate';
  return 'Beginner';
}

function getLevelColor(level: number) {
  if (level >= 90) return 'bg-violet-500';
  if (level >= 75) return 'bg-cyan-500';
  if (level >= 55) return 'bg-amber-500';
  return 'bg-[#4b5563]';
}

function SkillIcon({
  name,
  size = 'md',
}: {
  name: string;
  size?: 'sm' | 'md';
}) {
  const techData = techIconsWithColors[name];
  if (!techData) return null;
  const Icon = techData.icon;
  const cls = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return <Icon className={cls} style={{ color: techData.color }} />;
}

export default function SkillsEditor() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
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

  const closeEditor = () => setEditing(null);

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

  // Group skills by category
  const grouped = skills.reduce(
    (acc, skill) => {
      const cat = skill.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  const allCategories = Object.keys(grouped);
  const filteredGroups =
    activeCategory === 'All'
      ? grouped
      : { [activeCategory]: grouped[activeCategory] ?? [] };

  if (loading) return <LoadingSpinner />;

  return (
    <div className='space-y-6'>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* ── Editor ─────────────────────────────────────────────── */}
      {editing && (
        <AdminCard className='ring-1 ring-violet-500/20'>
          <AdminCardHeader
            title={isNew ? 'Add Skill' : 'Edit Skill'}
            description='Configure skill details and proficiency level'
            action={
              <button
                onClick={closeEditor}
                className='text-[#6b7280] hover:text-white transition-colors'
              >
                <X className='w-5 h-5' />
              </button>
            }
          />

          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {/* Name with icon preview */}
              <FormField label='Skill Name'>
                <div className='relative'>
                  {editing.name && (
                    <div className='absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center'>
                      <SkillIcon name={editing.name} size='sm' />
                    </div>
                  )}
                  <Input
                    value={editing.name}
                    onChange={(e) =>
                      setEditing((p) =>
                        p ? { ...p, name: e.target.value } : null,
                      )
                    }
                    placeholder='e.g. React, Node.js'
                    className={
                      editing.name && techIconsWithColors[editing.name]
                        ? 'pl-9'
                        : ''
                    }
                  />
                </div>
                {editing.name && techIconsWithColors[editing.name] && (
                  <p className='text-xs text-green-400 mt-1 flex items-center gap-1'>
                    <span className='inline-block w-1.5 h-1.5 rounded-full bg-green-400' />
                    Icon found
                  </p>
                )}
                {editing.name && !techIconsWithColors[editing.name] && (
                  <p className='text-xs text-[#6b7280] mt-1'>
                    No icon — will display text only
                  </p>
                )}
              </FormField>

              {/* Category */}
              <FormField label='Category'>
                <div className='grid grid-cols-2 gap-2 pt-1'>
                  {CATEGORIES.map((cat) => {
                    const colors =
                      CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.Other;
                    const isSelected = editing.category === cat;
                    return (
                      <button
                        key={cat}
                        type='button'
                        onClick={() =>
                          setEditing((p) =>
                            p ? { ...p, category: cat } : null,
                          )
                        }
                        className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all text-left flex items-center gap-2
                          ${
                            isSelected
                              ? `${colors.bg} ${colors.border} ${colors.text}`
                              : 'bg-[#0d0d16] border-[#1a1a2e] text-[#6b7280] hover:border-[#2a2a3e] hover:text-white'
                          }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? colors.dot : 'bg-[#374151]'}`}
                        />
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </FormField>
            </div>

            {/* Level slider */}
            <FormField
              label={`Proficiency — ${getLevelLabel(editing.level ?? 80)} (${editing.level ?? 80}%)`}
            >
              <div className='space-y-3'>
                <div className='relative h-2 bg-[#1a1a2e] rounded-full overflow-hidden'>
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${getLevelColor(editing.level ?? 80)}`}
                    style={{ width: `${editing.level ?? 80}%` }}
                  />
                </div>
                <input
                  type='range'
                  min={10}
                  max={100}
                  step={5}
                  value={editing.level ?? 80}
                  onChange={(e) =>
                    setEditing((p) =>
                      p ? { ...p, level: Number(e.target.value) } : null,
                    )
                  }
                  className='w-full accent-violet-500 cursor-pointer'
                />
                <div className='flex justify-between text-xs text-[#4b5563]'>
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
              </div>
            </FormField>

            <div className='flex justify-end gap-3 pt-2 border-t border-[#1a1a2e]'>
              <SecondaryButton onClick={closeEditor}>Cancel</SecondaryButton>
              <PrimaryButton onClick={handleSave} loading={saving}>
                <Save className='w-4 h-4' />
                {isNew ? 'Add Skill' : 'Save Changes'}
              </PrimaryButton>
            </div>
          </div>
        </AdminCard>
      )}

      {/* ── Skills List ────────────────────────────────────────── */}
      <AdminCard>
        <AdminCardHeader
          title='Skills'
          description={`${skills.length} skill${skills.length !== 1 ? 's' : ''} across ${allCategories.length} categories`}
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
            description='Add your technical skills to showcase your expertise'
            action={
              <SecondaryButton onClick={openNew}>
                <Plus className='w-4 h-4' />
                Add Skill
              </SecondaryButton>
            }
          />
        ) : (
          <div className='space-y-6'>
            {/* Category filter tabs */}
            <div className='flex gap-2 flex-wrap'>
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  activeCategory === 'All'
                    ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
                    : 'bg-[#0d0d16] border-[#1a1a2e] text-[#6b7280] hover:text-white hover:border-[#2a2a3e]'
                }`}
              >
                All ({skills.length})
              </button>
              {allCategories.map((cat) => {
                const colors = CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.Other;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5 ${
                      isActive
                        ? `${colors.bg} ${colors.border} ${colors.text}`
                        : 'bg-[#0d0d16] border-[#1a1a2e] text-[#6b7280] hover:text-white hover:border-[#2a2a3e]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isActive ? colors.dot : 'bg-[#374151]'}`}
                    />
                    {cat} ({grouped[cat]?.length ?? 0})
                  </button>
                );
              })}
            </div>

            {/* Grouped skill cards */}
            {Object.entries(filteredGroups).map(([category, catSkills]) => {
              const colors = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Other;
              return (
                <div key={category} className='space-y-2'>
                  {/* Category header */}
                  <div className='flex items-center gap-2 mb-3'>
                    <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    <h3
                      className={`text-xs font-bold uppercase tracking-widest ${colors.text}`}
                    >
                      {category}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${colors.bg} ${colors.border} ${colors.text}`}
                    >
                      {catSkills.length}
                    </span>
                    <div className='flex-1 h-px bg-[#1a1a2e]' />
                  </div>

                  {/* Skills grid */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
                    {catSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className='group relative bg-[#0d0d14] border border-[#1f1f2e] rounded-xl p-3.5 hover:border-[#2a2a3e] transition-all hover:bg-[#111119]'
                      >
                        <div className='flex items-center justify-between gap-2 mb-2.5'>
                          <div className='flex items-center gap-2.5 min-w-0'>
                            {/* Tech icon */}
                            <div
                              className={`w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0`}
                            >
                              <SkillIcon name={skill.name} />
                            </div>
                            <div className='min-w-0'>
                              <p className='text-sm font-semibold text-white truncate'>
                                {skill.name}
                              </p>
                              <p className={`text-xs ${colors.text}`}>
                                {getLevelLabel(skill.level)}
                              </p>
                            </div>
                          </div>
                          {/* Actions */}
                          <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0'>
                            <button
                              onClick={() => openEdit(skill)}
                              className='p-1.5 rounded-lg text-[#6b7280] hover:text-white hover:bg-[#1a1a2e] transition-all'
                            >
                              <Edit2 className='w-3 h-3' />
                            </button>
                            <button
                              onClick={() => handleDelete(skill.id!)}
                              className='p-1.5 rounded-lg text-[#6b7280] hover:text-red-400 hover:bg-red-500/10 transition-all'
                            >
                              <Trash2 className='w-3 h-3' />
                            </button>
                          </div>
                        </div>

                        {/* Level bar */}
                        <div className='space-y-1'>
                          <div className='h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden'>
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${getLevelColor(skill.level)}`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <div className='flex justify-between items-center'>
                            <span className='text-xs text-[#4b5563]'>
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
