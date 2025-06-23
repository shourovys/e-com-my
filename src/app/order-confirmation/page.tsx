'use client';

import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId');

  // If no order ID is provided, redirect to home
  useEffect(() => {
    if (!orderId) {
      router.push('/');
    }
  }, [orderId, router]);

  if (!orderId) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Redirecting...
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-12 max-w-md'>
      <Card className='text-center'>
        <CardContent className='pt-6 px-6 pb-8 space-y-6'>
          <div className='flex justify-center'>
            <div className='rounded-full bg-green-100 p-3'>
              <CheckCircle2 className='h-12 w-12 text-green-600' />
            </div>
          </div>

          <h1 className='text-2xl font-bold'>Order Placed Successfully!</h1>

          <p className='text-muted-foreground'>
            Thank you for your order. We have received your order and will
            process it as soon as possible.
          </p>

          <div className='bg-muted p-4 rounded-md'>
            <h2 className='font-medium text-lg'>Order #{orderId}</h2>
            <p className='text-sm text-muted-foreground mt-1'>
              Estimated delivery time: 25-40 minutes
            </p>
          </div>

          <div className='pt-4 flex flex-col sm:flex-row gap-3 justify-center'>
            <Link href='/' passHref>
              <Button className='w-full sm:w-auto'>Continue Shopping</Button>
            </Link>

            {/* This would link to order history in a real app */}
            <Button variant='outline' className='w-full sm:w-auto' disabled>
              View Order Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center min-h-screen'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
