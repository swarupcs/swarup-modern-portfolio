'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { usePortfolio } from '@/lib/portfolio-context';
import { Plus, Trash2, Edit, Save, X, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

import type { Project } from '@/lib/portfolio-data';

export default function ProjectsEditor() {
  const { portfolioData, updatePortfolioData } = usePortfolio();
  const [projects, setProjects] = useState<Project[]>(
    portfolioData.projects as Project[],
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Project | null>(null);
  const [newTech, setNewTech] = useState('');


  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditForm({ ...project });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSave = () => {
    if (!editForm) return;

    const updatedProjects = projects.map((p) =>
      p.id === editForm.id ? editForm : p,
    );
    setProjects(updatedProjects);
    updatePortfolioData({ projects: updatedProjects });
    setEditingId(null);
    setEditForm(null);
    toast('Success!', {
      description: 'Project updated successfully.',
    });
  };

  const handleDelete = (id: string) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    setProjects(updatedProjects);
    updatePortfolioData({ projects: updatedProjects });
      toast('Deleted', {
        description: 'Project removed.',
      });
    };

  const handleAddNew = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description',
      image: '/placeholder.svg?height=300&width=600',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
      category: 'Web Development',
      featured: false,
      hidden: false, // default visible
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    updatePortfolioData({ projects: updatedProjects });
    handleEdit(newProject);
  };

  const handleAddTechnology = () => {
    if (newTech.trim() && editForm) {
      setEditForm({
        ...editForm,
        technologies: [...editForm.technologies, newTech.trim()],
      });
      setNewTech('');
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        technologies: editForm.technologies.filter((t) => t !== tech),
      });
    }
  };

  const toggleHidden = (project: Project) => {
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? { ...p, hidden: !p.hidden } : p,
    );
    setProjects(updatedProjects);
    updatePortfolioData({ projects: updatedProjects });
toast(project.hidden ? 'Project visible' : 'Project hidden', {
  description: project.hidden
    ? 'This project will now appear on the Work page.'
    : 'This project is now hidden from the Work page.',
});

  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-2xl font-bold'>Projects</h2>
          <p className='text-muted-foreground'>
            Manage your portfolio projects and visibility
          </p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className='mr-2 h-4 w-4' />
          Add Project
        </Button>
      </div>

      <div className='grid gap-6'>
        {projects.map((project) => (
          <Card key={project.id}>
            {editingId === project.id && editForm ? (
              <CardContent className='pt-6 space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Label htmlFor='visible'>Show on site</Label>
                    <Switch
                      id='visible'
                      checked={!editForm.hidden}
                      onCheckedChange={(checked) =>
                        setEditForm({ ...editForm, hidden: !checked })
                      }
                    />
                    <Badge
                      variant={editForm.hidden ? 'secondary' : 'default'}
                      className='ml-2'
                    >
                      {editForm.hidden ? 'Hidden' : 'Visible'}
                    </Badge>
                  </div>
                  <div className='flex gap-2'>
                    <Button onClick={handleSave}>
                      <Save className='mr-2 h-4 w-4' />
                      Save
                    </Button>
                    <Button variant='outline' onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>Title</Label>
                  <Input
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />
                </div>

                <div className='space-y-2'>
                  <Label>Description</Label>
                  <Textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label>Image URL</Label>
                    <Input
                      value={editForm.image}
                      onChange={(e) =>
                        setEditForm({ ...editForm, image: e.target.value })
                      }
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label>Category</Label>
                    <Input
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label>GitHub URL</Label>
                    <Input
                      value={editForm.githubUrl}
                      onChange={(e) =>
                        setEditForm({ ...editForm, githubUrl: e.target.value })
                      }
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label>Live Demo URL</Label>
                    <Input
                      value={editForm.liveUrl}
                      onChange={(e) =>
                        setEditForm({ ...editForm, liveUrl: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>Technologies</Label>
                  <div className='flex gap-2'>
                    <Input
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder='Add technology'
                      onKeyDown={(e) =>
                        e.key === 'Enter' &&
                        (e.preventDefault(), handleAddTechnology())
                      }
                    />
                    <Button type='button' onClick={handleAddTechnology}>
                      Add
                    </Button>
                  </div>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {editForm.technologies.map((tech) => (
                      <Badge key={tech} variant='secondary' className='gap-1'>
                        {tech}
                        <X
                          className='h-3 w-3 cursor-pointer'
                          onClick={() => handleRemoveTechnology(tech)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            ) : (
              <>
                <CardHeader>
                  <div className='flex justify-between items-start gap-4'>
                    <div>
                      <div className='flex items-center gap-2'>
                        <CardTitle>{project.title}</CardTitle>
                        {project.hidden ? (
                          <Badge
                            variant='secondary'
                            className='inline-flex items-center gap-1'
                          >
                            <EyeOff className='h-3 w-3' />
                            Hidden
                          </Badge>
                        ) : (
                          <Badge className='inline-flex items-center gap-1'>
                            <Eye className='h-3 w-3' />
                            Visible
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => handleEdit(project)}
                        title='Edit'
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => toggleHidden(project)}
                        title={project.hidden ? 'Show' : 'Hide'}
                      >
                        {project.hidden ? (
                          <Eye className='h-4 w-4' />
                        ) : (
                          <EyeOff className='h-4 w-4' />
                        )}
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => handleDelete(project.id)}
                        title='Delete'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    <div className='flex flex-wrap gap-2'>
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant='secondary'>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      <p>Category: {project.category}</p>
                      <p>GitHub: {project.githubUrl || '-'}</p>
                      <p>Live: {project.liveUrl || '-'}</p>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
