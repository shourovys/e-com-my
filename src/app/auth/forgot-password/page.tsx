'use client';

import Link from 'next/link';
import React, { useState } from 'react';
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
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
    const toastId = notificationService.loading('Sending reset link...');

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Always show success regardless of whether email exists (security best practice)
      notificationService.loadingToSuccess(
        toastId,
        'If an account with that email exists, a reset link has been sent.'
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error('Forgot password error:', error);
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
            Forgot Password
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className='text-center space-y-4'>
              <p className='text-green-600'>
                If an account with that email exists, a reset link has been
                sent.
              </p>
              <p>Please check your email and follow the instructions.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='john.doe@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className='text-sm text-red-500'>{errors.email}</p>
                )}
              </div>

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
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
