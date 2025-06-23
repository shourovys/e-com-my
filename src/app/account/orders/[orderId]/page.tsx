'use client';

import EmptyProductList from '@/components/common/EmptyProductList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { fetchOrderById, Order } from '@/lib/mocks/orders';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, MapPin, Truck } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orderId = params.orderId as string;

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const orderData = await fetchOrderById(orderId);

        if (!orderData) {
          setError('Order not found');
        } else if (orderData.userId !== user?.id) {
          setError('You do not have permission to view this order');
        } else {
          setOrder(orderData);
        }
      } catch (err) {
        setError('Failed to load order details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getOrderDetails();
    }
  }, [orderId, user]);

  // Helper function to get status badge color
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'PPP'); // e.g., "April 29, 2023"
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='h-8 bg-gray-200 rounded animate-pulse w-1/3 mb-6'></div>
        <div className='h-32 bg-gray-200 rounded animate-pulse mb-4'></div>
        <div className='h-64 bg-gray-200 rounded animate-pulse'></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <EmptyProductList
        message={error || 'Order not found'}
        actionLabel='Back to Orders'
        onAction={() => router.push('/account/orders')}
      />
    );
  }

  return (
    <div>
      <div className='flex items-center mb-6'>
        <Button
          variant='ghost'
          size='sm'
          className='mr-4'
          onClick={() => router.push('/account/orders')}
        >
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Orders
        </Button>

        <h2 className='text-xl font-semibold'>Order Details</h2>
      </div>

      {/* Order Header */}
      <Card className='mb-6'>
        <CardContent className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Order ID</p>
              <p className='font-medium'>{order.id}</p>

              <div className='flex items-center mt-2 text-sm text-muted-foreground'>
                <Calendar className='w-4 h-4 mr-1' />
                <span>Ordered on {formatDate(order.date)}</span>
              </div>
            </div>

            <div className='flex md:justify-end items-start'>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-lg'>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4 divide-y'>
            {order.items.map((item) => (
              <div key={item.id} className='pt-4 first:pt-0'>
                <div className='flex gap-4'>
                  <div className='w-16 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden relative'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes='64px'
                      className='object-cover'
                    />
                  </div>

                  <div className='flex-grow'>
                    <h4 className='font-medium'>{item.title}</h4>
                    <div className='flex justify-between mt-1'>
                      <p className='text-sm text-muted-foreground'>
                        Qty: {item.quantity}
                      </p>
                      <p className='font-medium'>
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipping and Payment Details */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle className='text-lg flex items-center'>
              <MapPin className='w-4 h-4 mr-2' />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='font-medium'>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.streetAddress}</p>
            <p>
              {order.shippingAddress.area}, {order.shippingAddress.city}
            </p>
            <p>
              {order.shippingAddress.division} -{' '}
              {order.shippingAddress.postalCode}
            </p>
            {order.shippingAddress.landmark && (
              <p className='text-sm text-muted-foreground mt-1'>
                Landmark: {order.shippingAddress.landmark}
              </p>
            )}
            <p className='mt-2'>Phone: {order.shippingAddress.phone}</p>
          </CardContent>
        </Card>

        {/* Payment and Delivery */}
        <Card>
          <CardHeader>
            <CardTitle className='text-lg flex items-center'>
              <Truck className='w-4 h-4 mr-2' />
              Payment & Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Payment Method</p>
                <p className='font-medium'>{order.paymentMethod}</p>
              </div>

              <div>
                <p className='text-sm text-muted-foreground'>Delivery Method</p>
                <p className='font-medium'>{order.deliveryMethod}</p>
              </div>
            </div>

            <div className='mt-6 pt-4 border-t'>
              <div className='flex justify-between mb-2'>
                <span>Subtotal</span>
                <span>{formatCurrency(order.total - order.deliveryFee)}</span>
              </div>
              <div className='flex justify-between mb-2'>
                <span>Delivery Fee</span>
                <span>{formatCurrency(order.deliveryFee)}</span>
              </div>
              <div className='flex justify-between font-medium text-lg pt-2 border-t'>
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
