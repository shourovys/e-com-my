'use client';

import { Heart, Minus, Plus, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import DiscountBadge from './DiscountBadge';
import PriceDisplay from './PriceDisplay';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  discountPrice: number;
  regularPrice?: number;
  discountBadge?: string;
  rating?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  discountPrice,
  regularPrice,
  discountBadge,
  rating = 0,
}) => {
  const { getQuantity, addToCart, updateQuantity, removeFromCart, items } =
    useCart();
  const quantity = getQuantity(id);
  const cartItem = items.find((item) => item.id === id);
  const hasDiscount =
    discountPrice && regularPrice && discountPrice !== regularPrice;
  const [showQuantityControls, setShowQuantityControls] = useState(
    quantity > 0
  );
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Show quantity controls when quantity > 0
    if (quantity > 0 && !showQuantityControls) {
      setShowQuantityControls(true);
    } else if (quantity === 0 && showQuantityControls) {
      setShowQuantityControls(false);
    }
  }, [quantity, showQuantityControls]);

  const handleIncrement = () => {
    if (quantity === 0) {
      addToCart(
        {
          id,
          image,
          title,
          discountPrice,
          regularPrice,
          hasOffer: hasDiscount ? true : undefined,
        },
        1
      );
    } else if (cartItem) {
      updateQuantity(cartItem.cartItemId, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (!cartItem) return;

    if (quantity === 1) {
      removeFromCart(cartItem.cartItemId);
    } else if (quantity > 1) {
      updateQuantity(cartItem.cartItemId, quantity - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className='space-y-2 group'>
      <div className='relative'>
        <Link
          href={`/product/${id}`}
          className='block relative h-[200px] w-full overflow-hidden'
        >
          <Image
            src={image}
            alt={title}
            fill
            className='w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300'
          />
        </Link>

        {/* Favorite Icon in top right */}
        <button
          onClick={toggleFavorite}
          className='absolute top-2 right-2 p-1.5'
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-100'
            }
            size={20}
          />
        </button>

        <div className='absolute bottom-4 -translate-x-1/2 left-1/2 w-[80%]'>
          <div className='relative h-9 flex justify-end'>
            {/* Quantity control strip - expanded state - width now relative to card width */}
            <div
              className={cn(
                'absolute right-0 flex items-center justify-between bg-white border border-gray-200 rounded-md transition-all duration-300 ease-in-out origin-right h-9',
                !showQuantityControls
                  ? 'opacity-0 scale-x-0 w-9 pointer-events-none'
                  : 'opacity-100 scale-x-100 w-full'
              )}
            >
              <Button
                variant='ghost'
                size='icon'
                className='h-full w-9 p-0 rounded-l-md text-gray-600 hover:bg-gray-50 transition-colors duration-200'
                onClick={handleDecrement}
                aria-label={
                  quantity === 1 ? 'Remove from cart' : 'Decrease quantity'
                }
              >
                {quantity === 1 ? (
                  <Trash2
                    size={18}
                    className='transition-transform duration-200'
                  />
                ) : (
                  <Minus
                    size={18}
                    className='transition-transform duration-200'
                  />
                )}
              </Button>
              <span className='flex-1 text-center font-medium text-gray-800 transition-all duration-200'>
                {quantity}
              </span>
              <Button
                variant='ghost'
                size='icon'
                className='h-full w-9 p-0 rounded-r-md text-gray-600 hover:bg-gray-50 transition-colors duration-200'
                onClick={handleIncrement}
                aria-label='Increase quantity'
              >
                <Plus size={18} className='transition-transform duration-200' />
              </Button>
            </div>

            {/* Single add button - initial state */}
            <div
              className={cn(
                'transition-all duration-300 ease-in-out',
                showQuantityControls
                  ? 'opacity-0 scale-0 pointer-events-none'
                  : 'opacity-100 scale-100'
              )}
            >
              <Button
                variant='ghost'
                className='h-9 w-9 p-0 rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 hover:bg-gray-50 transition-all duration-300'
                onClick={handleIncrement}
                aria-label='Add to cart'
              >
                <Plus
                  size={18}
                  className='transition-transform duration-200 hover:scale-110'
                />
                <span className='sr-only'>Add to cart</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Link href={`/product/${id}`} className='block space-y-1'>
        <div className='mb-1'>
          <PriceDisplay
            discountPrice={discountPrice}
            regularPrice={regularPrice}
          />
        </div>

        {hasDiscount && discountBadge && (
          <DiscountBadge>{discountBadge}</DiscountBadge>
        )}

        {/* Rating below price and above name */}
        <div className='flex items-center space-x-1 text-sm my-1'>
          <div className='flex items-center text-yellow-500'>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                fill={star <= rating ? 'currentColor' : 'none'}
                className='text-yellow-500'
              />
            ))}
          </div>
          <span className='text-xs text-gray-500'>
            {rating > 0 ? `${rating}/5` : 'No ratings'}
          </span>
        </div>

        <h3 className='font-medium text-sm text-gray-700 line-clamp-2 mb-2 group-hover:text-primary transition-colors'>
          {title}
        </h3>
      </Link>
    </div>
  );
};

export default ProductCard;
