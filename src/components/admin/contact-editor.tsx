'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { usePortfolio } from '@/lib/portfolio-context';
import { toast } from 'sonner';

export default function ContactEditor() {
  const { portfolioData } = usePortfolio();

  const handleSave = () => {
    toast('Info', {
      description:
        'Contact information is managed in the Personal Info section.',
    });
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Your contact information is managed in the Personal Info tab. Go
            there to update your email, phone, and social links.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <p className='text-sm font-medium'>Email</p>
              <p className='text-sm text-muted-foreground'>
                {portfolioData.personalInfo.email}
              </p>
            </div>
            <div>
              <p className='text-sm font-medium'>Phone</p>
              <p className='text-sm text-muted-foreground'>
                {portfolioData.personalInfo.phone}
              </p>
            </div>
            <div>
              <p className='text-sm font-medium'>Location</p>
              <p className='text-sm text-muted-foreground'>
                {portfolioData.personalInfo.location}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
