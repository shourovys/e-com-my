'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
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

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log form data to console
      console.log('Form submission:', formData);

      // Reset form and show success message
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ form: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-6'>Contact Us</h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div>
          <div className='prose prose-slate max-w-none'>
            <p className='text-lg mb-4'>
              We&apos;re here to help! If you have any questions, feedback, or
              concerns, please don&apos;t hesitate to get in touch with us.
            </p>

            <div className='mt-6'>
              <h2 className='text-xl font-semibold mb-4'>
                Our Contact Information
              </h2>
              <p className='mb-2'>
                <strong>Email:</strong> support@synergymart.com
              </p>
              <p className='mb-2'>
                <strong>Phone:</strong> +880 1234 567890
              </p>
              <p className='mb-2'>
                <strong>Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM
              </p>
              <p className='mb-6'>
                <strong>Address:</strong> 123 Commerce Street, Dhaka, Bangladesh
              </p>
            </div>

            <h2 className='text-xl font-semibold mb-4'>Connect With Us</h2>
            <p>
              Follow us on social media to stay updated with our latest
              products, promotions, and announcements.
            </p>
            <div className='flex gap-4 mt-4'>
              <span className='cursor-pointer'>Facebook</span>
              <span className='cursor-pointer'>Twitter</span>
              <span className='cursor-pointer'>Instagram</span>
            </div>
          </div>
        </div>

        <div>
          <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
            <h2 className='text-xl font-semibold mb-4'>Send Us a Message</h2>

            {isSubmitted ? (
              <div className='text-center py-8'>
                <p className='text-green-600 font-medium mb-2'>
                  Thank you for your message!
                </p>
                <p className='mb-4'>
                  We have received your inquiry and will get back to you as soon
                  as possible.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant='outline'
                  className='mt-2'
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    id='name'
                    name='name'
                    placeholder='Your Name'
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className='text-sm text-red-500'>{errors.name}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='your.email@example.com'
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className='text-sm text-red-500'>{errors.email}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='message'>Message</Label>
                  <Textarea
                    id='message'
                    name='message'
                    placeholder='How can we help you?'
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.message && (
                    <p className='text-sm text-red-500'>{errors.message}</p>
                  )}
                </div>

                {errors.form && (
                  <p className='text-sm text-red-500 text-center'>
                    {errors.form}
                  </p>
                )}

                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className='mt-8 mb-4'>
        <Link href='/' passHref>
          <Button variant='outline'>Back to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}
