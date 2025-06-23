'use client';

import { cn } from '@/lib/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: {
    id: string;
    cartItemId: string;
    image: string;
    title: string;
    discountPrice: number;
    regularPrice?: number;
    quantity: number;
    hasOffer?: boolean;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.cartItemId, item.quantity - 1);
    } else {
      removeFromCart(item.cartItemId);
    }
  };

  const handleQuantityIncrease = () => {
    updateQuantity(item.cartItemId, item.quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.cartItemId);
  };

  return (
    <div className='flex gap-3 py-3 border-b'>
      <div className='relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100'>
        <Image
          src={item.image}
          alt={item.title}
          width={80}
          height={80}
          className='w-full h-full object-cover'
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
          <button
            onClick={handleRemove}
            className='text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 cursor-pointer'
            aria-label='Remove item'
          >
            <Trash2 className='size-5 sm:size-4' />
          </button>
        </div>

        <div className='mb-2'>
          <div className='flex items-center'>
            <span className='font-medium text-sm sm:text-base'>
              Tk {item.discountPrice.toFixed(2)}
            </span>
            {item.regularPrice && item.regularPrice > item.discountPrice && (
              <span className='ml-2 text-gray-400 text-xs sm:text-sm line-through'>
                Tk {item.regularPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className='flex items-center'>
          <div className='flex items-center border border-gray-300 rounded-md overflow-hidden'>
            <button
              onClick={handleQuantityDecrease}
              className={cn(
                'size-8 flex items-center justify-center  transition-colors border-r border-gray-300 cursor-pointer bg-gray-50 hover:bg-gray-100',
                item.quantity <= 1 ? ' text-red-500' : ' text-gray-700'
              )}
              aria-label={
                item.quantity <= 1 ? 'Remove item' : 'Decrease quantity'
              }
            >
              {item.quantity <= 1 ? <Trash2 size={14} /> : <Minus size={14} />}
            </button>
            <div className='size-8 flex items-center justify-center bg-white'>
              <span className='font-medium text-xs sm:text-sm text-gray-800'>
                {item.quantity}
              </span>
            </div>
            <button
              onClick={handleQuantityIncrease}
              className='size-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border-l border-gray-300 cursor-pointer'
              aria-label='Increase quantity'
            >
              <Plus size={14} />
            </button>
          </div>
          <div className='ml-auto font-medium text-sm sm:text-base'>
            Tk {(item.discountPrice * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
