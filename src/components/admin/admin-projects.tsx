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
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string | null;
  image: string | null;
  category: string | null;
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  hidden: boolean;
  technologies: Array<{ id: number; technology: string }>;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    live_url: '',
    github_url: '',
    featured: false,
    hidden: false,
    technologies: [] as string[],
  });
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/portfolio/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
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

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      category: '',
      live_url: '',
      github_url: '',
      featured: false,
      hidden: false,
      technologies: [],
    });
    setEditingId(null);
    setTechInput('');
  };

  const editProject = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description || '',
      image: project.image || '',
      category: project.category || '',
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      featured: project.featured,
      hidden: project.hidden,
      technologies: project.technologies.map((t) => t.technology),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const url = editingId
        ? `/api/portfolio/projects/${editingId}`
        : '/api/portfolio/projects';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(editingId ? 'Project updated!' : 'Project added!');
        fetchProjects();
        resetForm();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setMessage('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/portfolio/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Project deleted!');
        fetchProjects();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage('Error deleting project');
    }
  };

  if (loading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Add/Edit Project</CardTitle>
          <CardDescription>
            {editingId ? 'Update your project' : 'Add a new project'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Project Title</Label>
              <Input
                id='title'
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='Your awesome project'
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='category'>Category</Label>
                <Input
                  id='category'
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  placeholder='Web App, Mobile, etc.'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='image'>Image URL</Label>
                <Input
                  id='image'
                  name='image'
                  value={formData.image}
                  onChange={handleChange}
                  placeholder='https://example.com/image.jpg'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Describe your project'
                rows={4}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='live_url'>Live URL</Label>
                <Input
                  id='live_url'
                  name='live_url'
                  value={formData.live_url}
                  onChange={handleChange}
                  placeholder='https://yourproject.com'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='github_url'>GitHub URL</Label>
                <Input
                  id='github_url'
                  name='github_url'
                  value={formData.github_url}
                  onChange={handleChange}
                  placeholder='https://github.com/username/project'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Technologies</Label>
              <div className='flex gap-2'>
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), addTechnology())
                  }
                  placeholder='Add a technology'
                />
                <Button type='button' onClick={addTechnology} variant='outline'>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className='bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2'
                  >
                    {tech}
                    <button
                      type='button'
                      onClick={() => removeTechnology(index)}
                      className='hover:text-red-500'
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='featured'
                  name='featured'
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor='featured' className='cursor-pointer'>
                  Featured Project
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='hidden'
                  name='hidden'
                  checked={formData.hidden}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      hidden: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor='hidden' className='cursor-pointer'>
                  Hidden
                </Label>
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
        <h3 className='text-lg font-semibold mb-4'>Your Projects</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent className='pt-6'>
                <div className='space-y-2'>
                  <h4 className='font-semibold'>{project.title}</h4>
                  <p className='text-xs text-muted-foreground'>
                    {project.featured && (
                      <span className='text-primary'>⭐ Featured</span>
                    )}
                    {project.hidden && (
                      <span className='text-red-500 ml-2'>🔒 Hidden</span>
                    )}
                  </p>
                  <div className='flex gap-2 flex-wrap'>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech.id}
                        className='text-xs bg-primary/10 text-primary px-2 py-1 rounded'
                      >
                        {tech.technology}
                      </span>
                    ))}
                  </div>
                  <div className='flex gap-2 pt-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => editProject(project)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => deleteProject(project.id)}
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
