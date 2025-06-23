'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import notificationService from '../../../services/notification-service';

// Component that uses useSearchParams must be wrapped in Suspense
function ResetPasswordForm() {
  const router = useRouter();
  // This will now be safely used within a component wrapped by Suspense
  const searchParams = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    // Check if token exists
    if (!token) {
      setTokenError(true);
    }
  }, [token]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const toastId = notificationService.loading('Resetting password...');

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      notificationService.loadingToSuccess(
        toastId,
        'Password has been reset successfully!'
      );

      // Redirect to login page after successful password reset
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } catch (error) {
      console.error('Reset password error:', error);
      notificationService.loadingToError(
        toastId,
        'An error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto px-4 py-12 max-w-md'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>
            Reset Password
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tokenError ? (
            <div className='text-center space-y-4'>
              <p className='text-red-600'>
                Invalid or expired reset link. Please request a new password
                reset.
              </p>
              <Button asChild className='mt-4'>
                <Link href='/auth/forgot-password'>Request New Reset Link</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='password'>New Password</Label>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className='text-sm text-red-500'>{errors.password}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className='text-sm text-red-500'>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Link
            href='/auth/login'
            className='text-sm text-blue-500 hover:text-blue-700'
          >
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className='container mx-auto px-4 py-12 max-w-md'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded mb-4 w-48 mx-auto'></div>
            <div className='h-4 bg-gray-200 rounded mb-8 w-64 mx-auto'></div>
            <div className='h-10 bg-gray-200 rounded mb-4'></div>
            <div className='h-10 bg-gray-200 rounded mb-8'></div>
            <div className='h-10 bg-gray-200 rounded'></div>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
