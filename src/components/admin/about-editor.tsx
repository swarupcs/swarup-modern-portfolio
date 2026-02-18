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
import { usePortfolio } from '@/lib/portfolio-context';
import { Plus, Save, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AboutEditor() {
  const { portfolioData, updatePortfolioData } = usePortfolio();
  const [aboutData, setAboutData] = useState(
    portfolioData.about || {
      bio1: '',
      bio2: '',
      interests: [],
      socialLinks: [],
    },
  );
  const [newInterest, setNewInterest] = useState('');

  const handleBioChange = (field: string, value: string) => {
    setAboutData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setAboutData((prev) => ({
        ...prev,
        interests: [
          ...prev.interests,
          { label: newInterest.trim(), color: 'text-orange-500' },
        ],
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (index: number) => {
    setAboutData((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i: number) => i !== index),
    }));
  };

  const handleSave = () => {
    updatePortfolioData({ about: aboutData });
    toast('Success!', {
      description: 'About section updated successfully.',
    });
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Biography</CardTitle>
          <CardDescription>
            Update your biography and professional summary
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='bio1'>First Paragraph</Label>
            <Textarea
              id='bio1'
              value={aboutData.bio1 || ''}
              onChange={(e) => handleBioChange('bio1', e.target.value)}
              placeholder='Tell us about yourself and your experience...'
              rows={4}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='bio2'>Second Paragraph</Label>
            <Textarea
              id='bio2'
              value={aboutData.bio2 || ''}
              onChange={(e) => handleBioChange('bio2', e.target.value)}
              placeholder='Share more about your skills and expertise...'
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interests & Passions</CardTitle>
          <CardDescription>Add interests that describe you</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex gap-2'>
            <Input
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder='Add an interest (e.g., Coffee Enthusiast)'
              onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
            />
            <Button onClick={handleAddInterest}>
              <Plus className='mr-2 h-4 w-4' />
              Add
            </Button>
          </div>

          <div className='flex flex-wrap gap-2'>
            {aboutData.interests &&
              aboutData.interests.map((interest: { label: string; color: string }, index: number) => (
                <Badge key={index} variant='secondary' className='gap-1'>
                  {interest.label}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => handleRemoveInterest(index)}
                  />
                </Badge>
              ))}
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
