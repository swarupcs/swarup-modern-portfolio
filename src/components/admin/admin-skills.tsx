'use client';

import React from 'react';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Skill {
  id: number;
  name: string;
  category: string;
}

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newCategory, setNewCategory] = useState('Frontend');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const categories = [
    'Frontend',
    'Backend',
    'Tools & Platforms',
    'Databases',
    'DevOps',
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/portfolio/skills');
      if (res.ok) {
        const data = await res.json();
        // Flatten the grouped skills back to a list
        const flatSkills: Skill[] = [];
        data.forEach((group: { name: string; skills: string[] }) => {
          group.skills.forEach((skill) => {
            flatSkills.push({
              id: flatSkills.length,
              name: skill,
              category: group.name,
            });
          });
        });
        setSkills(flatSkills);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    setSaving(true);
    try {
      const res = await fetch('/api/portfolio/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newSkill, category: newCategory }),
      });

      if (res.ok) {
        setNewSkill('');
        await fetchSkills();
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (skillName: string) => {
    try {
      const res = await fetch(`/api/portfolio/skills/${skillName}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await fetchSkills();
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  if (loading) return <div>Loading skills...</div>;

  // Group skills by category for display
  const groupedSkills = categories.reduce(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  return (
    <div className='space-y-6'>
      {/* Add Skill Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddSkill} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Input
                placeholder='Skill name (e.g., React, Node.js)'
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger>
                  <SelectValue placeholder='Select category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type='submit' disabled={saving}>
                <Plus className='w-4 h-4 mr-2' />
                {saving ? 'Adding...' : 'Add Skill'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Skills by Category */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {categories.map((category) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className='text-lg'>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                {groupedSkills[category] &&
                groupedSkills[category].length > 0 ? (
                  groupedSkills[category].map((skill) => (
                    <div
                      key={skill.id}
                      className='flex items-center justify-between p-2 bg-muted rounded'
                    >
                      <span className='text-sm font-medium'>{skill.name}</span>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDeleteSkill(skill.name)}
                      >
                        <Trash2 className='w-4 h-4 text-red-500' />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className='text-sm text-muted-foreground'>
                    No skills added yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
