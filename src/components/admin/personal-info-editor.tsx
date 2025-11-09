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
import { usePortfolio } from '@/lib/portfolio-context';
import { Save } from 'lucide-react';
import { toast } from 'sonner';


export default function PersonalInfoEditor() {
  const { portfolioData, updatePortfolioData } = usePortfolio();
  const [formData, setFormData] = useState(portfolioData.personalInfo);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  const handleSave = () => {
    updatePortfolioData({ personalInfo: formData });
    toast.success('Success!', {
      description: 'Personal information updated successfully.',
    });
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your basic information and bio
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder='Swarup Das'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='title'>Professional Title</Label>
              <Input
                id='title'
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder='Full Stack Developer'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='bio'>Bio</Label>
            <Textarea
              id='bio'
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder='Tell us about yourself...'
              rows={4}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='avatar'>Avatar URL</Label>
            <Input
              id='avatar'
              value={formData.avatar}
              onChange={(e) => handleChange('avatar', e.target.value)}
              placeholder='https://example.com/avatar.jpg'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='resumeUrl'>Resume URL</Label>
            <Input
              id='resumeUrl'
              value={formData.resumeUrl}
              onChange={(e) => handleChange('resumeUrl', e.target.value)}
              placeholder='/resume.pdf'
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Update your contact details</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder='swarupd1999@gmail.com'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                id='phone'
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder='6290994583'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='location'>Location</Label>
            <Input
              id='location'
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder='West Bengal, India'
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Update your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='github'>GitHub</Label>
            <Input
              id='github'
              value={formData.socialLinks.github}
              onChange={(e) => handleSocialChange('github', e.target.value)}
              placeholder='https://github.com/username'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='linkedin'>LinkedIn</Label>
            <Input
              id='linkedin'
              value={formData.socialLinks.linkedin}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              placeholder='https://linkedin.com/in/username'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='twitter'>Twitter</Label>
            <Input
              id='twitter'
              value={formData.socialLinks.twitter}
              onChange={(e) => handleSocialChange('twitter', e.target.value)}
              placeholder='https://twitter.com/username'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='website'>Website</Label>
            <Input
              id='website'
              value={formData.socialLinks.website}
              onChange={(e) => handleSocialChange('website', e.target.value)}
              placeholder='https://yourwebsite.com'
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className='w-full md:w-auto'>
        <Save className='mr-2 h-4 w-4' />
        Save Changes
      </Button>
    </div>
  );
}
