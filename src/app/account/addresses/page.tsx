'use client';

import EmptyProductList from '@/components/common/EmptyProductList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import {
  Address,
  addAddress,
  bangladeshCities,
  bangladeshDivisions,
  fetchAddressesByUserId,
} from '@/lib/mocks/addresses';
import { cn } from '@/lib/utils';
import { Check, MapPin, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AddressesPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState('Dhaka');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    streetAddress: '',
    area: '',
    city: 'Dhaka',
    division: 'Dhaka',
    postalCode: '',
    landmark: '',
    isDefault: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getAddresses = async () => {
      if (user) {
        const userAddresses = await fetchAddressesByUserId(user.id);
        setAddresses(userAddresses);
      }
      setLoading(false);
    };

    getAddresses();
  }, [user]);

  // Update cities when division changes
  useEffect(() => {
    if (selectedDivision) {
      setFormData((prev) => ({
        ...prev,
        division: selectedDivision,
        city: bangladeshCities[
          selectedDivision as keyof typeof bangladeshCities
        ][0],
      }));
    }
  }, [selectedDivision]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(e.target.value);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10,12}$/.test(formData.phone.replace(/[^\d]/g, '')))
      newErrors.phone = 'Please enter a valid phone number';

    if (!formData.streetAddress.trim())
      newErrors.streetAddress = 'Street address is required';
    if (!formData.area.trim()) newErrors.area = 'Area is required';
    if (!formData.postalCode.trim())
      newErrors.postalCode = 'Postal code is required';
    else if (!/^\d{4,6}$/.test(formData.postalCode.replace(/[^\d]/g, '')))
      newErrors.postalCode = 'Please enter a valid postal code';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // In a real app, we would submit to an API
      await addAddress({
        userId: user?.id || '1',
        ...formData,
      });

      // Mock the addition of the new address to our local state
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        userId: user?.id || '1',
        ...formData,
      };

      // If this is set as default, update other addresses
      if (newAddress.isDefault) {
        setAddresses((prev) =>
          prev.map((addr) => ({
            ...addr,
            isDefault: false,
          }))
        );
      }

      // Add the new address to the state
      setAddresses((prev) => [...prev, newAddress]);

      // Close the dialog and reset form
      setIsDialogOpen(false);
      setFormData({
        fullName: '',
        phone: '',
        streetAddress: '',
        area: '',
        city: 'Dhaka',
        division: 'Dhaka',
        postalCode: '',
        landmark: '',
        isDefault: false,
      });
    } catch (error) {
      console.error('Error adding address:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='h-8 bg-gray-200 rounded animate-pulse w-1/3 mb-6'></div>
        {[1, 2].map((i) => (
          <div key={i} className='h-32 bg-gray-200 rounded animate-pulse'></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold'>My Addresses</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size='sm'>
              <Plus className='w-4 h-4 mr-2' />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>
                Enter your address details below.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='fullName'>Full Name</Label>
                  <Input
                    id='fullName'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.fullName && (
                    <p className='text-xs text-red-500'>{errors.fullName}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='phone'>Phone Number</Label>
                  <Input
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className='text-xs text-red-500'>{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='streetAddress'>
                  Street Address / House No.
                </Label>
                <Input
                  id='streetAddress'
                  name='streetAddress'
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className={errors.streetAddress ? 'border-red-500' : ''}
                  disabled={isSubmitting}
                />
                {errors.streetAddress && (
                  <p className='text-xs text-red-500'>{errors.streetAddress}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='area'>Area / Neighborhood</Label>
                <Input
                  id='area'
                  name='area'
                  value={formData.area}
                  onChange={handleChange}
                  className={errors.area ? 'border-red-500' : ''}
                  disabled={isSubmitting}
                />
                {errors.area && (
                  <p className='text-xs text-red-500'>{errors.area}</p>
                )}
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='division'>Division</Label>
                  <select
                    id='division'
                    name='division'
                    value={selectedDivision}
                    onChange={handleDivisionChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                    disabled={isSubmitting}
                  >
                    {bangladeshDivisions.map((division) => (
                      <option key={division} value={division}>
                        {division}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='city'>City</Label>
                  <select
                    id='city'
                    name='city'
                    value={formData.city}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                    disabled={isSubmitting}
                  >
                    {bangladeshCities[
                      selectedDivision as keyof typeof bangladeshCities
                    ].map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='postalCode'>Postal Code</Label>
                <Input
                  id='postalCode'
                  name='postalCode'
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={errors.postalCode ? 'border-red-500' : ''}
                  disabled={isSubmitting}
                />
                {errors.postalCode && (
                  <p className='text-xs text-red-500'>{errors.postalCode}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='landmark'>Landmark (Optional)</Label>
                <Textarea
                  id='landmark'
                  name='landmark'
                  value={formData.landmark}
                  onChange={handleChange}
                  className='resize-none'
                  placeholder='E.g., Near City Bank, Opposite to Park'
                  disabled={isSubmitting}
                />
              </div>

              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='isDefault'
                  name='isDefault'
                  checked={formData.isDefault}
                  onChange={handleCheckboxChange}
                  className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                  disabled={isSubmitting}
                />
                <Label htmlFor='isDefault' className='text-sm font-normal'>
                  Set as default address
                </Label>
              </div>

              <DialogFooter className='mt-6'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Address'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <EmptyProductList
          message="You haven't added any addresses yet."
          actionLabel='Add Address'
          onAction={() => setIsDialogOpen(true)}
        />
      ) : (
        <div className='space-y-4'>
          {addresses.map((address) => (
            <Card
              key={address.id}
              className={cn(
                'overflow-hidden transition-all',
                address.isDefault
                  ? 'border-primary/50 bg-primary/5'
                  : 'hover:shadow-md'
              )}
            >
              <CardContent className='p-0'>
                <div className='p-6'>
                  <div className='flex justify-between items-start mb-4'>
                    <div className='flex items-center'>
                      <h3 className='font-medium text-lg mr-2'>
                        {address.fullName}
                      </h3>
                      {address.isDefault && (
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary'>
                          <Check className='w-3 h-3 mr-1' />
                          Default
                        </span>
                      )}
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => console.log('Delete address:', address.id)}
                    >
                      <Trash className='w-4 h-4 text-red-500' />
                    </Button>
                  </div>

                  <div className='flex items-start'>
                    <MapPin className='w-5 h-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0' />
                    <div>
                      <p>{address.streetAddress}</p>
                      <p>
                        {address.area}, {address.city}, {address.division}
                      </p>
                      <p>Postal Code: {address.postalCode}</p>
                      {address.landmark && (
                        <p className='text-sm text-muted-foreground mt-1'>
                          Landmark: {address.landmark}
                        </p>
                      )}
                      <p className='mt-2'>Phone: {address.phone}</p>
                    </div>
                  </div>

                  <div className='mt-4 pt-4 border-t flex justify-end'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => console.log('Edit address:', address.id)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
