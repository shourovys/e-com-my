'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import React, { useEffect, useState } from 'react';

interface Address {
  street: string;
  apartment: string;
  city: string;
  area: string;
  instructions: string;
  leaveAtDoor: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  address?: Address;
}

interface DeliveryAddressProps {
  onContinue: () => void;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ onContinue }) => {
  const { user } = useAuth();
  const [address, setAddress] = useState<Address>({
    street: '',
    apartment: '',
    city: 'Dhaka', // Default city for MVP
    area: '',
    instructions: '',
    leaveAtDoor: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Address>>({});

  // Fetch user's address if exists
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        // For MVP, we'll check if user has an address in the 'me' endpoint
        const userProfile = await api.get<UserProfile>('/me');
        if (userProfile && userProfile.address) {
          setAddress(userProfile.address);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    if (user) {
      fetchAddress();
    }
  }, [user]);

  const validateAddress = (): boolean => {
    const newErrors: Partial<Address> = {};

    if (!address.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    if (!address.area.trim()) {
      newErrors.area = 'Area/Neighborhood is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAddress()) {
      return;
    }

    setIsLoading(true);

    try {
      // For MVP, save to localStorage for now
      localStorage.setItem('deliveryAddress', JSON.stringify(address));

      // If we had a real API, we would update the user's address:
      // await api.put(`/users/${user?.id}/address`, address);

      // Move to next step
      onContinue();
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <h2 className='text-lg font-medium mb-4'>Delivery Address</h2>

        <div className='space-y-4'>
          <div>
            <Label htmlFor='street'>Street Address</Label>
            <Input
              id='street'
              name='street'
              value={address.street}
              onChange={handleChange}
              className={errors.street ? 'border-red-500' : ''}
            />
            {errors.street && (
              <p className='text-sm text-red-500 mt-1'>{errors.street}</p>
            )}
          </div>

          <div>
            <Label htmlFor='apartment'>Apartment/Suite (Optional)</Label>
            <Input
              id='apartment'
              name='apartment'
              value={address.apartment}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor='city'>City</Label>
            <Input
              id='city'
              name='city'
              value={address.city}
              onChange={handleChange}
              disabled // Fixed to Dhaka for MVP
            />
            <p className='text-xs text-muted-foreground mt-1'>
              Currently serving Dhaka only
            </p>
          </div>

          <div>
            <Label htmlFor='area'>Area/Neighborhood</Label>
            <Input
              id='area'
              name='area'
              value={address.area}
              onChange={handleChange}
              className={errors.area ? 'border-red-500' : ''}
            />
            {errors.area && (
              <p className='text-sm text-red-500 mt-1'>{errors.area}</p>
            )}
          </div>

          <div>
            <Label htmlFor='instructions'>
              Delivery Instructions (Optional)
            </Label>
            <Textarea
              id='instructions'
              name='instructions'
              value={address.instructions}
              onChange={handleChange}
              placeholder='E.g., Ring doorbell twice, call when nearby, etc.'
              className='resize-none'
            />
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='leaveAtDoor'
              checked={address.leaveAtDoor}
              onCheckedChange={(checked) =>
                setAddress((prev) => ({
                  ...prev,
                  leaveAtDoor: checked === true,
                }))
              }
            />
            <Label htmlFor='leaveAtDoor' className='text-sm'>
              Leave order at the door
            </Label>
          </div>
        </div>
      </div>

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save and Continue'}
      </Button>
    </form>
  );
};

export default DeliveryAddress;
