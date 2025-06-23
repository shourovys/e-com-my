'use client';

import EmptyProductList from '@/components/common/EmptyProductList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { fetchOrdersByUserId, Order } from '@/lib/mocks/orders';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar, Package } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      if (user) {
        const userOrders = await fetchOrdersByUserId(user.id);
        setOrders(userOrders);
      }
      setLoading(false);
    };

    getOrders();
  }, [user]);

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
        {[1, 2, 3].map((i) => (
          <div key={i} className='h-32 bg-gray-200 rounded animate-pulse'></div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyProductList
        message="You haven't placed any orders yet."
        actionLabel='Start Shopping'
        onAction={() => (window.location.href = '/')}
      />
    );
  }

  return (
    <div>
      <h2 className='text-xl font-semibold mb-6'>Order History</h2>

      <div className='space-y-4'>
        {orders.map((order) => (
          <Card
            key={order.id}
            className='overflow-hidden transition-shadow hover:shadow-md'
          >
            <CardContent className='p-0'>
              <div className='p-6'>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-4'>
                  <div className='mb-2 sm:mb-0'>
                    <p className='text-sm text-muted-foreground'>Order ID</p>
                    <p className='font-medium'>{order.id}</p>
                  </div>

                  <div className='flex flex-wrap gap-2 items-center'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                    <div className='flex items-center text-sm text-muted-foreground'>
                      <Calendar className='w-4 h-4 mr-1' />
                      {formatDate(order.date)}
                    </div>
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center border-t pt-4'>
                  <div className='mb-3 sm:mb-0'>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground mb-1'>
                      <Package className='w-4 h-4' />
                      <span>
                        {order.items.length}{' '}
                        {order.items.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <p className='font-medium'>
                      Total: {formatCurrency(order.total)}
                    </p>
                  </div>

                  <Button asChild variant='outline' size='sm'>
                    <Link href={`/account/orders/${order.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
