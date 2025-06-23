'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className='max-w-xl mx-auto'>
      <h2 className='text-xl font-semibold mb-6'>My Profile</h2>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-lg'>Account Information</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              value={user?.name || ''}
              disabled
              className='bg-muted/30'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              value={user?.email || ''}
              disabled
              className='bg-muted/30'
            />
          </div>
        </CardContent>
      </Card>

      <div className='text-sm text-muted-foreground'>
        <p>
          This information is used for notifications related to your orders and
          account.
        </p>
        <p className='mt-2'>
          To update your profile information, please contact customer support.
        </p>
      </div>
    </div>
  );
}
