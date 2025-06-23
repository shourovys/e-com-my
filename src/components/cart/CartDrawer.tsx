'use client';

import { ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import CartItem from './CartItem';

interface CartDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, setOpen }) => {
  const { items = [], total = 0, itemCount = 0 } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side='right' className='p-0 sm:max-w-md w-full'>
        <SheetHeader className='flex justify-between items-center border-b px-3 sm:px-4 py-3 sm:py-4 bg-white sticky top-0 z-10'>
          <div className='flex items-center'>
            <ShoppingBag className='h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-700' />
            <SheetTitle className='text-base sm:text-lg font-medium'>
              Your Cart {itemCount > 0 && `(${itemCount})`}
            </SheetTitle>
          </div>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-gray-100'
            onClick={() => setOpen(false)}
          >
            <X className='h-4 w-4 sm:h-5 sm:w-5' />
            <span className='sr-only'>Close cart</span>
          </Button>
        </SheetHeader>

        <div
          className='flex-1 overflow-y-auto py-2 px-3 sm:px-4 flex flex-col justify-between'
          style={{ maxHeight: 'calc(100vh - 12rem)' }}
        >
          {items.length > 0 ? (
            <div className='space-y-3'>
              {items.map((item) => (
                <CartItem key={item.cartItemId} item={item} />
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-full text-center p-4'>
              <div className='size-20 md:size-24 mb-4 rounded-full bg-gray-100 flex items-center justify-center'>
                <ShoppingBag className='size-10 md:size-12 text-gray-400' />
              </div>
              <p className='text-gray-500 mb-4 text-sm sm:text-base'>
                Your cart is empty
              </p>
              <Button onClick={() => setOpen(false)}>Continue Shopping</Button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className='border-t sticky bottom-0 bg-white'>
            <div className='w-full'>
              <div className='p-3 sm:p-4 bg-gray-50 space-y-2'>
                <div className='flex justify-between w-full'>
                  <span className='text-xs sm:text-sm text-gray-500'>
                    Subtotal
                  </span>
                  <span className='text-xs sm:text-sm font-medium'>
                    Tk {total.toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between w-full'>
                  <span className='text-sm sm:text-base font-medium'>
                    Total
                  </span>
                  <span className='text-sm sm:text-base font-bold'>
                    Tk {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className='p-3 sm:p-4 space-y-2'>
                <Button
                  asChild
                  className='w-full h-10 sm:h-12 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium text-sm sm:text-base'
                >
                  <Link href='/checkout' onClick={() => setOpen(false)}>
                    Proceed to Checkout
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
