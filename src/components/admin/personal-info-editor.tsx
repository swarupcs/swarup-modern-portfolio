'use client';

import { useState, useEffect } from 'react';
import {
  Save,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Phone,
  MapPin,
  User,
  Link,
} from 'lucide-react';
import {
  AdminCard,
  AdminCardHeader,
  FormField,
  Input,
  PrimaryButton,
  Toast,
  LoadingSpinner,
} from './ui';

interface PersonalInfo {
  id?: string;
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  resume: string;
  avatar: string;
}

const DEFAULT: PersonalInfo = {
  name: '',
  title: '',
  subtitle: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  github: '',
  linkedin: '',
  twitter: '',
  resume: '',
  avatar: '',
};

export default function PersonalInfoEditor() {
  const [data, setData] = useState<PersonalInfo>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    fetch('/api/admin/personal-info')
      .then((r) => r.json())
      .then((d) => {
        if (d) setData(d);
      })
      .catch(() => setToast({ message: 'Failed to load data', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  const set =
    (k: keyof PersonalInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setData((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/personal-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setData(updated);
      setToast({
        message: 'Personal info saved successfully!',
        type: 'success',
      });
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

      {/* Basic Info */}
      <AdminCard>
        <AdminCardHeader
          title='Basic Information'
          description='Your name and professional title'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <FormField label='Full Name'>
            <div className='relative'>
              <User className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
              <Input
                className='pl-10'
                value={data.name}
                onChange={set('name')}
                placeholder='John Doe'
              />
            </div>
          </FormField>
          <FormField label='Professional Title'>
            <Input
              value={data.title}
              onChange={set('title')}
              placeholder='Full Stack Developer'
            />
          </FormField>
          <FormField label='Subtitle / Tagline'>
            <Input
              value={data.subtitle}
              onChange={set('subtitle')}
              placeholder='Building beautiful web experiences'
            />
          </FormField>
          <FormField label='Avatar URL'>
            <div className='flex gap-2'>
              {data.avatar && (
                <img
                  src={data.avatar}
                  alt='avatar'
                  className='w-10 h-10 rounded-xl object-cover shrink-0 border border-[#2a2a3e]'
                />
              )}
              <Input
                value={data.avatar}
                onChange={set('avatar')}
                placeholder='https://...'
              />
            </div>
          </FormField>
          <FormField label='Resume URL'>
            <div className='relative'>
              <Link className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
              <Input
                className='pl-10'
                value={data.resume}
                onChange={set('resume')}
                placeholder='https://...'
              />
            </div>
          </FormField>
        </div>
      </AdminCard>

      {/* Contact */}
      <AdminCard>
        <AdminCardHeader
          title='Contact Details'
          description='How people can reach you'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <FormField label='Email'>
            <div className='relative'>
              <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
              <Input
                className='pl-10'
                type='email'
                value={data.email}
                onChange={set('email')}
                placeholder='john@example.com'
              />
            </div>
          </FormField>
          <FormField label='Phone'>
            <div className='relative'>
              <Phone className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
              <Input
                className='pl-10'
                value={data.phone}
                onChange={set('phone')}
                placeholder='+1 234 567 8900'
              />
            </div>
          </FormField>
          <FormField label='Location'>
            <div className='relative'>
              <MapPin className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
              <Input
                className='pl-10'
                value={data.location}
                onChange={set('location')}
                placeholder='New York, NY'
              />
            </div>
          </FormField>
          <FormField label='Website'>
            <div className='relative'>
              <Globe className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
              <Input
                className='pl-10'
                value={data.website}
                onChange={set('website')}
                placeholder='https://yoursite.com'
              />
            </div>
          </FormField>
        </div>
      </AdminCard>

      {/* Social Links */}
      <AdminCard>
        <AdminCardHeader
          title='Social Profiles'
          description='Your online presence'
        />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <FormField label='GitHub'>
            <div className='relative'>
              <Github className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
              <Input
                className='pl-10'
                value={data.github}
                onChange={set('github')}
                placeholder='https://github.com/username'
              />
            </div>
          </FormField>
          <FormField label='LinkedIn'>
            <div className='relative'>
              <Linkedin className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
              <Input
                className='pl-10'
                value={data.linkedin}
                onChange={set('linkedin')}
                placeholder='https://linkedin.com/in/username'
              />
            </div>
          </FormField>
          <FormField label='Twitter / X'>
            <div className='relative'>
              <Twitter className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]' />
              <Input
                className='pl-10'
                value={data.twitter}
                onChange={set('twitter')}
                placeholder='https://twitter.com/username'
              />
            </div>
          </FormField>
        </div>
      </AdminCard>

      {/* Save */}
      <div className='flex justify-end'>
        <PrimaryButton onClick={handleSave} loading={saving}>
          <Save className='w-4 h-4' />
          Save Changes
        </PrimaryButton>
      </div>
    </div>
  );
}
