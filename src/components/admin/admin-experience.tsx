'use client';

import React from 'react';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';

interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string | null;
  skills: Array<{ id: number; skill: string }>;
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    duration: '',
    description: '',
    skills: [] as string[],
  });
  const [skillInput, setSkillInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/portfolio/experience');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      duration: '',
      description: '',
      skills: [],
    });
    setEditingId(null);
    setSkillInput('');
  };

  const editExperience = (exp: Experience) => {
    setEditingId(exp.id);
    setFormData({
      company: exp.company,
      role: exp.role,
      duration: exp.duration,
      description: exp.description || '',
      skills: exp.skills.map((s) => s.skill),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const url = editingId
        ? `/api/portfolio/experience/${editingId}`
        : '/api/portfolio/experience';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(editingId ? 'Experience updated!' : 'Experience added!');
        fetchExperiences();
        resetForm();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving experience');
      }
    } catch (error) {
      console.error('Error saving experience:', error);
      setMessage('Error saving experience');
    } finally {
      setSaving(false);
    }
  };

  const deleteExperience = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const response = await fetch(`/api/portfolio/experience/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Experience deleted!');
        fetchExperiences();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
      setMessage('Error deleting experience');
    }
  };

  if (loading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Add/Edit Experience</CardTitle>
          <CardDescription>
            {editingId
              ? 'Update your experience'
              : 'Add a new experience entry'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='company'>Company</Label>
                <Input
                  id='company'
                  name='company'
                  value={formData.company}
                  onChange={handleChange}
                  placeholder='Company name'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='role'>Role</Label>
                <Input
                  id='role'
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                  placeholder='Your role'
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='duration'>Duration</Label>
              <Input
                id='duration'
                name='duration'
                value={formData.duration}
                onChange={handleChange}
                placeholder='Jan 2020 - Dec 2021'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Describe your responsibilities and achievements'
                rows={4}
              />
            </div>

            <div className='space-y-2'>
              <Label>Skills</Label>
              <div className='flex gap-2'>
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), addSkill())
                  }
                  placeholder='Add a skill'
                />
                <Button type='button' onClick={addSkill} variant='outline'>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className='bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2'
                  >
                    {skill}
                    <button
                      type='button'
                      onClick={() => removeSkill(index)}
                      className='hover:text-red-500'
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {message && (
              <div
                className={`text-sm p-2 rounded ${message.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
              >
                {message}
              </div>
            )}

            <div className='flex gap-2'>
              <Button type='submit' disabled={saving} className='flex-1'>
                {saving ? 'Saving...' : editingId ? 'Update' : 'Add'}
              </Button>
              {editingId && (
                <Button type='button' onClick={resetForm} variant='outline'>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Your Experiences</h3>
        <div className='space-y-3'>
          {experiences.map((exp) => (
            <Card key={exp.id}>
              <CardContent className='pt-6'>
                <div className='flex justify-between items-start'>
                  <div className='flex-1'>
                    <h4 className='font-semibold'>{exp.role}</h4>
                    <p className='text-sm text-muted-foreground'>
                      {exp.company}
                    </p>
                    <p className='text-xs text-muted-foreground mt-1'>
                      {exp.duration}
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => editExperience(exp)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => deleteExperience(exp.id)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
