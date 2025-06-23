'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import {
  ArrowLeft,
  Check,
  MapPin,
  Phone,
  Shield,
  Truck,
  Wallet,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DeliveryOption {
  id: string;
  title: string;
  price: number;
  estimatedTime: string;
  icon: React.ReactNode;
}

interface PaymentMethod {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    bkashNumber: '',
    transactionId: '',
  });

  const [selectedDeliveryOption, setSelectedDeliveryOption] =
    useState<string>('standard');
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Define delivery options
  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'standard',
      title: 'Standard Delivery',
      price: 50,
      estimatedTime: '3-5 days',
      icon: <Truck className='h-5 w-5 text-primary' />,
    },
    {
      id: 'express',
      title: 'Express Delivery',
      price: 120,
      estimatedTime: '1-2 days',
      icon: <Truck className='h-5 w-5 text-primary' />,
    },
    {
      id: 'pickup',
      title: 'Store Pickup',
      price: 0,
      estimatedTime: 'Same day',
      icon: <MapPin className='h-5 w-5 text-primary' />,
    },
  ];

  // Define payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'bkash',
      title: 'bKash',
      icon: <Phone className='h-5 w-5 text-pink-600' />,
      description: 'Pay with your bKash wallet',
    },
    {
      id: 'cash',
      title: 'Cash on Delivery',
      icon: <Wallet className='h-5 w-5 text-green-600' />,
      description: 'Pay when you receive your order',
    },
  ];

  // Get selected delivery option
  const getSelectedDeliveryOption = () => {
    return (
      deliveryOptions.find((option) => option.id === selectedDeliveryOption) ||
      deliveryOptions[0]
    );
  };

  // Calculate total with delivery fee
  const deliveryFee = getSelectedDeliveryOption().price;
  const platformFee = 15;
  const grandTotal = total + deliveryFee + platformFee;

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10,12}$/.test(formData.phone.replace(/[^\d]/g, '')))
      newErrors.phone = 'Please enter a valid phone number';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Please enter a valid email address';

    if (!formData.address.trim() && selectedDeliveryOption !== 'pickup')
      newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    // bKash validation (only if bkash is selected)
    if (selectedPaymentMethod === 'bkash') {
      if (!formData.bkashNumber.trim())
        newErrors.bkashNumber = 'bKash number is required';
      else if (!/^\d{11}$/.test(formData.bkashNumber.replace(/[^\d]/g, '')))
        newErrors.bkashNumber = 'Please enter a valid bKash number (11 digits)';

      if (!formData.transactionId.trim())
        newErrors.transactionId = 'Transaction ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // In a real app, we would submit to an API
      console.log('Submitting order:', {
        items,
        delivery: getSelectedDeliveryOption(),
        paymentMethod: selectedPaymentMethod,
        customer: formData,
        total: grandTotal,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear cart and redirect to confirmation page
      clearCart();
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect to home if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items.length, router]);

  return (
    <div className='pb-20 bg-gray-50'>
      {/* Header - Simplified */}
      <header className='bg-white z-10 border-b '>
        <div className='max-w-7xl mx-auto p-4 flex items-center'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => router.back()}
            className='mr-2'
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='sr-only'>Go back</span>
          </Button>
          <h1 className='text-lg font-medium truncate'>Complete Your Order</h1>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-12 gap-8'>
          {/* Checkout Form */}
          <div className='md:col-span-7'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Contact Information - Removed section number */}
              <div className='space-y-5 bg-white p-6 rounded-xl '>
                <h2 className='text-xl font-semibold text-gray-800 pb-3 border-b'>
                  Contact Information
                </h2>

                <div className='space-y-4'>
                  <div>
                    <Label
                      htmlFor='name'
                      className='text-sm font-medium text-gray-700'
                    >
                      Name
                    </Label>
                    <Input
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 ${
                        errors.name
                          ? 'border-red-500 focus-visible:ring-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder='Your full name'
                    />
                    {errors.name && (
                      <p className='text-red-500 text-xs mt-1'>{errors.name}</p>
                    )}
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label
                        htmlFor='phone'
                        className='text-sm font-medium text-gray-700'
                      >
                        Phone
                      </Label>
                      <Input
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className={`mt-1 ${
                          errors.phone
                            ? 'border-red-500 focus-visible:ring-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder='Your phone number'
                      />
                      {errors.phone && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor='email'
                        className='text-sm font-medium text-gray-700'
                      >
                        Email
                      </Label>
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 ${
                          errors.email
                            ? 'border-red-500 focus-visible:ring-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder='Your email address'
                      />
                      {errors.email && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Details - Removed section number */}
              <div className='space-y-5 bg-white p-6 rounded-xl '>
                <h2 className='text-xl font-semibold text-gray-800 pb-3 border-b'>
                  Delivery Details
                </h2>

                <div className='space-y-4'>
                  <div>
                    <Label
                      htmlFor='address'
                      className='text-sm font-medium text-gray-700'
                    >
                      Address
                    </Label>
                    <Input
                      id='address'
                      name='address'
                      value={formData.address}
                      onChange={handleChange}
                      disabled={selectedDeliveryOption === 'pickup'}
                      className={`mt-1 ${
                        errors.address
                          ? 'border-red-500 focus-visible:ring-red-500'
                          : 'border-gray-300'
                      } ${
                        selectedDeliveryOption === 'pickup' ? 'bg-gray-100' : ''
                      }`}
                      placeholder='Street address'
                    />
                    {errors.address && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label
                        htmlFor='city'
                        className='text-sm font-medium text-gray-700'
                      >
                        City
                      </Label>
                      <Input
                        id='city'
                        name='city'
                        value={formData.city}
                        onChange={handleChange}
                        className={`mt-1 ${
                          errors.city
                            ? 'border-red-500 focus-visible:ring-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder='Your city'
                      />
                      {errors.city && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor='postalCode'
                        className='text-sm font-medium text-gray-700'
                      >
                        Postal Code
                      </Label>
                      <Input
                        id='postalCode'
                        name='postalCode'
                        value={formData.postalCode}
                        onChange={handleChange}
                        className='mt-1 border-gray-300'
                        placeholder='Postal code'
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor='notes'
                      className='text-sm font-medium text-gray-700'
                    >
                      Delivery Notes (Optional)
                    </Label>
                    <Textarea
                      id='notes'
                      name='notes'
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder='Any special instructions for delivery'
                      className='resize-none mt-1 border-gray-300 h-24'
                    />
                  </div>
                </div>

                <div className='pt-5 mt-4 border-t'>
                  <p className='text-base font-medium text-gray-800 mb-3'>
                    Delivery Options
                  </p>
                  <RadioGroup
                    value={selectedDeliveryOption}
                    onValueChange={setSelectedDeliveryOption}
                    className='space-y-3'
                  >
                    {deliveryOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center space-x-2 border p-4 rounded-lg transition-all ${
                          selectedDeliveryOption === option.id
                            ? 'border-primary bg-primary/5 '
                            : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                        }`}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={`delivery-${option.id}`}
                        />
                        <Label
                          htmlFor={`delivery-${option.id}`}
                          className='flex items-center gap-3 flex-1 cursor-pointer'
                        >
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10`}
                          >
                            {option.icon}
                          </div>
                          <div className='flex-1'>
                            <div className='font-medium'>{option.title}</div>
                            <div className='text-sm text-gray-500'>
                              Est. {option.estimatedTime}
                            </div>
                          </div>
                          <div
                            className={`font-medium rounded-full px-3 py-1 text-sm ${
                              option.price === 0
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {option.price === 0 ? 'Free' : `Tk ${option.price}`}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              {/* Payment Method - Removed section number */}
              <div className='space-y-5 bg-white p-6 rounded-xl '>
                <h2 className='text-xl font-semibold text-gray-800 pb-3 border-b'>
                  Payment Method
                </h2>

                <RadioGroup
                  value={selectedPaymentMethod}
                  onValueChange={setSelectedPaymentMethod}
                  className='space-y-3'
                >
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-center space-x-2 border p-4 rounded-lg transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-primary bg-primary/5 '
                          : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      <RadioGroupItem
                        value={method.id}
                        id={`payment-${method.id}`}
                      />
                      <Label
                        htmlFor={`payment-${method.id}`}
                        className='flex items-center gap-3 flex-1 cursor-pointer'
                      >
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            method.id === 'bkash'
                              ? 'bg-pink-100'
                              : 'bg-green-100'
                          }`}
                        >
                          {method.icon}
                        </div>
                        <div className='flex-1'>
                          <div className='font-medium'>{method.title}</div>
                          <div className='text-sm text-gray-500'>
                            {method.description}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* bKash Form */}
                {selectedPaymentMethod === 'bkash' && (
                  <div className='space-y-4 border p-5 rounded-md mt-4 bg-gray-50'>
                    <div>
                      <Label
                        htmlFor='bkashNumber'
                        className='text-sm font-medium text-gray-700'
                      >
                        bKash Number
                      </Label>
                      <Input
                        id='bkashNumber'
                        name='bkashNumber'
                        value={formData.bkashNumber}
                        onChange={handleChange}
                        placeholder='01XXXXXXXXX'
                        className={`mt-1 ${
                          errors.bkashNumber
                            ? 'border-red-500 focus-visible:ring-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      {errors.bkashNumber && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.bkashNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor='transactionId'
                        className='text-sm font-medium text-gray-700'
                      >
                        Transaction ID
                      </Label>
                      <Input
                        id='transactionId'
                        name='transactionId'
                        value={formData.transactionId}
                        onChange={handleChange}
                        placeholder='TrxID'
                        className={`mt-1 ${
                          errors.transactionId
                            ? 'border-red-500 focus-visible:ring-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      {errors.transactionId && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.transactionId}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className='pt-6 mt-5 border-t flex flex-col gap-2'>
                  <div className='flex items-center justify-center gap-2 text-sm text-gray-600 mb-2'>
                    <Shield className='h-4 w-4 text-green-500' />
                    <span>
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                  <Button
                    type='submit'
                    className='w-full bg-primary hover:bg-primary/90 text-white py-2.5 h-12 rounded-lg'
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? 'Processing...'
                      : `Complete Order • Tk ${grandTotal.toFixed(2)}`}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary - Enhanced */}
          <div className='md:col-span-5'>
            <div className='bg-white p-6 rounded-xl sticky top-[100px] '>
              <h2 className='text-xl font-semibold pb-3 border-b text-gray-800 flex items-center justify-between'>
                Order Summary
                <span className='text-sm bg-primary/10 text-primary px-3 py-1 rounded-full'>
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </h2>

              <div className='space-y-3 my-5 max-h-[45vh] overflow-y-auto pr-2 scrollbar-thin'>
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className='flex gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors'
                  >
                    <div className='relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100'>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className='object-cover'
                      />
                      {item.hasOffer && (
                        <div className='absolute top-0 right-0 bg-primary text-white text-[10px] sm:text-xs px-1 py-0.5 rounded-bl-md'>
                          Offer
                        </div>
                      )}
                    </div>

                    <div className='flex-1 min-w-0'>
                      <div className='flex justify-between items-start mb-1'>
                        <h3 className='font-medium text-sm sm:text-base line-clamp-2 pr-2'>
                          {item.title}
                        </h3>
                      </div>

                      <div className='mb-2 flex justify-between items-center'>
                        <div className='flex flex-col'>
                          <span className='font-semibold text-sm'>
                            Tk {item.discountPrice.toFixed(2)}
                          </span>
                          {item.regularPrice &&
                            item.regularPrice > item.discountPrice && (
                              <span className='text-gray-500 line-through text-xs'>
                                Tk {item.regularPrice.toFixed(2)}
                              </span>
                            )}
                        </div>

                        <div className='flex items-center border border-gray-200 rounded-md overflow-hidden text-sm'>
                          <span className='px-2 py-1 bg-gray-50 font-medium'>
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='border-t pt-4 space-y-3 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='font-medium'>Tk {total.toFixed(2)}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-600'>Delivery Fee</span>
                  <span className='font-medium'>
                    {deliveryFee === 0 ? (
                      <span className='text-green-600'>Free</span>
                    ) : (
                      `Tk ${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-600'>Platform Fee</span>
                  <span className='font-medium'>
                    Tk {platformFee.toFixed(2)}
                  </span>
                </div>

                <div className='flex justify-between font-medium text-base pt-3 mt-2 border-t'>
                  <span className='text-gray-800'>Total</span>
                  <span className='text-lg text-primary font-semibold'>
                    Tk {grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className='mt-6 pt-4  bg-gray-50 p-4 rounded-lg'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <Check className='h-4 w-4 text-green-500' />
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <Check className='h-4 w-4 text-green-500' />
                    <span>Warranty coverage on all products</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm text-gray-700'>
                    <Check className='h-4 w-4 text-green-500' />
                    <span>Customer support 7 days a week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
