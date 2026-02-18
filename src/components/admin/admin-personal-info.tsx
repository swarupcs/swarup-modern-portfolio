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

export default function AdminPersonalInfo() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    github_url: '',
    linkedin_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      const response = await fetch('/api/admin/personal-info');
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching personal info:', error);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/personal-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('[v0] Response status:', response.status);
      console.log('[v0] Response headers:', response.headers);

      const responseText = await response.text();
      console.log('[v0] Response text:', responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('[v0] Failed to parse response:', parseError);
        setMessage(`Server error: ${responseText.substring(0, 100)}`);
        setSaving(false);
        return;
      }

      if (response.ok) {
        setMessage('Personal info updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorMessage =
          responseData.error || 'Error updating personal info';
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error('[v0] Error saving personal info:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Error saving personal info';
      setMessage(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Your full name'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='Your professional title'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='your.email@example.com'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='github_url'>GitHub URL</Label>
              <Input
                id='github_url'
                name='github_url'
                value={formData.github_url}
                onChange={handleChange}
                placeholder='https://github.com/username'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='linkedin_url'>LinkedIn URL</Label>
              <Input
                id='linkedin_url'
                name='linkedin_url'
                value={formData.linkedin_url}
                onChange={handleChange}
                placeholder='https://linkedin.com/in/username'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='bio'>Bio</Label>
            <Textarea
              id='bio'
              name='bio'
              value={formData.bio}
              onChange={handleChange}
              placeholder='Write a short bio about yourself'
              rows={5}
            />
          </div>

          {message && (
            <div
              className={`text-sm p-2 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {message}
            </div>
          )}

          <Button type='submit' disabled={saving} className='w-full'>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
