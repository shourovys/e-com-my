'use client';

import { CheckCircle2, CreditCard, MapPin } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Checkbox } from '../../../components/ui/checkbox';
import { Label } from '../../../components/ui/label';
import { useCart } from '../../../contexts/CartContext';

interface OrderReviewProps {
  onBack: () => void;
}

interface DeliveryAddress {
  street: string;
  apartment?: string;
  area: string;
  city: string;
  instructions?: string;
  leaveAtDoor?: boolean;
}

const OrderReview: React.FC<OrderReviewProps> = ({ onBack }) => {
  const { items, subtotal } = useCart();
  const [agreeTnC, setAgreeTnC] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Delivery details from previous steps
  const [address, setAddress] = useState<DeliveryAddress | null>(null);

  // Hardcoded values for MVP
  const deliveryFee = 37;
  const platformFee = 14;

  // Calculate the actual total with fees
  const calculatedTotal = subtotal + deliveryFee + platformFee;

  // Load stored data from previous steps
  useEffect(() => {
    const storedAddress = localStorage.getItem('deliveryAddress');

    if (storedAddress) {
      setAddress(JSON.parse(storedAddress));
    }
  }, []);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTnC) {
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, this would create an order via API
      // For MVP, just simulate a successful order creation
      const mockOrderId = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderId(mockOrderId);
      setOrderPlaced(true);

      // Clear cart after successful order
      localStorage.removeItem('cart');

      // In a real app, we would navigate to a confirmation page with the order ID
      // router.push(`/order-confirmation/${response.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Order success view
  if (orderPlaced && orderId) {
    return (
      <div className='text-center space-y-6 py-8'>
        <div className='flex justify-center'>
          <CheckCircle2 className='h-16 w-16 text-primary' />
        </div>
        <h2 className='text-2xl font-bold'>Order Placed Successfully!</h2>
        <p className='text-lg'>Thank you for your order.</p>
        <div className='bg-muted p-4 rounded-md inline-block mx-auto'>
          <p className='font-medium'>Order #{orderId}</p>
          <p className='text-sm text-muted-foreground mt-1'>
            Estimated delivery: 25-40 mins
          </p>
        </div>
        <div className='pt-4'>
          <Link href='/' passHref>
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePlaceOrder} className='space-y-8'>
      <div>
        <h2 className='text-lg font-medium mb-4'>Order Summary</h2>

        {/* Order Items */}
        <Card className='mb-6'>
          <CardContent className='p-4 space-y-4'>
            {items.map((item) => (
              <div key={item.cartItemId} className='flex justify-between'>
                <div>
                  <span className='font-medium'>{item.quantity}x</span>{' '}
                  {item.title}
                </div>
                <div>Tk {item.discountPrice * item.quantity}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card className='mb-6'>
          <CardContent className='p-4 space-y-2'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span>Tk {subtotal}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Delivery Fee</span>
              <span>Tk {deliveryFee}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Platform Fee</span>
              <span>Tk {platformFee}</span>
            </div>
            <div className='flex justify-between font-medium pt-2 border-t mt-2'>
              <span>Total</span>
              <span>Tk {calculatedTotal}</span>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        {address && (
          <Card className='mb-6'>
            <CardContent className='p-4'>
              <div className='flex'>
                <MapPin className='h-5 w-5 text-muted-foreground mr-2 flex-shrink-0' />
                <div>
                  <h3 className='font-medium'>Delivery Address</h3>
                  <p className='text-sm text-muted-foreground mt-1'>
                    {address.street},{' '}
                    {address.apartment && `${address.apartment}, `}
                    {address.area}, {address.city}
                  </p>
                  {address.instructions && (
                    <p className='text-sm mt-1'>
                      <span className='font-medium'>Instructions:</span>{' '}
                      {address.instructions}
                    </p>
                  )}
                  {address.leaveAtDoor && (
                    <p className='text-sm mt-1'>Leave at door ✓</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Method */}
        <Card className='mb-6'>
          <CardContent className='p-4'>
            <div className='flex'>
              <CreditCard className='h-5 w-5 text-muted-foreground mr-2 flex-shrink-0' />
              <div>
                <h3 className='font-medium'>Payment Method</h3>
                <p className='text-sm text-muted-foreground mt-1'>
                  bKash (bdhf616q)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms and Conditions Agreement */}
        <div className='flex items-start space-x-2 my-6'>
          <Checkbox
            id='terms'
            checked={agreeTnC}
            onCheckedChange={(checked) => setAgreeTnC(checked === true)}
            className='mt-1'
          />
          <div>
            <Label htmlFor='terms' className='text-sm'>
              By completing this order, I agree to all
              <Link
                href='/terms-and-conditions'
                className='text-primary ml-1'
                target='_blank'
              >
                terms & conditions
              </Link>
              .
            </Label>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex flex-col gap-2 sm:flex-row sm:justify-between'>
        <Button
          type='button'
          variant='outline'
          onClick={onBack}
          className='order-2 sm:order-1'
        >
          Back
        </Button>
        <Button
          type='submit'
          disabled={isLoading || !agreeTnC}
          className='order-1 sm:order-2'
        >
          {isLoading ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </form>
  );
};

export default OrderReview;
