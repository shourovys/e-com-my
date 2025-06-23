'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductHeaderProps {
  title?: string;
}

export default function ProductHeader({
  title = 'Product Details',
}: ProductHeaderProps) {
  const router = useRouter();

  return (
    <header className='bg-white z-10'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => router.back()}
            className='mr-2'
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='sr-only'>Go back</span>
          </Button>
          <h1 className='text-lg font-medium truncate'>{title}</h1>
        </div>
      </div>
    </header>
  );
}
