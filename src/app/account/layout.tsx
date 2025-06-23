'use client';

import AccountSidebar from '@/components/features/account/AccountSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    // Short timeout to let authentication check complete
    const timer = setTimeout(() => {
      if (!user) {
        router.push('/auth/login');
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]'>
        <div className='animate-pulse text-center'>
          <div className='h-8 w-32 bg-gray-200 rounded mx-auto mb-4'></div>
          <div className='h-64 w-full max-w-md bg-gray-200 rounded'></div>
        </div>
      </div>
    );
  }

  // Only render content if user is authenticated
  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>My Account</h1>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {/* Sidebar - takes 1/4 of width on desktop, full width on mobile */}
        <aside className='md:col-span-1'>
          <AccountSidebar />
        </aside>

        {/* Main content area - takes 3/4 of width on desktop, full width on mobile */}
        <main className='md:col-span-3'>
          <div className='bg-white shadow rounded-lg p-6'>{children}</div>
        </main>
      </div>
    </div>
  );
}
