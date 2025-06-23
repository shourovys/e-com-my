'use client';

import QuantityAdjuster from '@/components/common/QuantityAdjuster';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';

interface ColorOption {
  name: string;
  hex: string;
}

interface ProductInfoProps {
  product: Product;
  colors: ColorOption[];
  sizes: string[];
  onAddToCart: (quantity: number, color: string, size: string) => void;
  onBuyNow: (quantity: number, color: string, size: string) => void;
}

export default function ProductInfo({
  product,
  colors,
  sizes,
  onAddToCart,
  onBuyNow,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    colors[0]?.name || 'Black'
  );
  const [selectedSize, setSelectedSize] = useState(sizes[0] || 'One Size');

  const handleAddToCart = () => {
    onAddToCart(quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    onBuyNow(quantity, selectedColor, selectedSize);
  };

  return (
    <div className='px-3 sm:px-4 pt-4 sm:pt-6 md:pt-0 md:pl-6 sm:md:pl-8'>
      <div className='flex items-center mb-2 sm:mb-3'>
        <div className='bg-neutral-100 px-1.5 sm:px-2 py-0.5 sm:py-1 text-2xs sm:text-xs mr-2 rounded-md'>
          {product.brand || 'Brand'}
        </div>
        <div className='flex items-center text-2xs sm:text-xs bg-neutral-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md'>
          <div className='flex items-center'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${
                  i < (product.rating || 5)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className='ml-1 text-gray-600'>
            ({product.reviewCount || 0})
          </span>
        </div>
      </div>

      <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3 text-gray-800'>
        {product.title}
      </h1>

      <div className='flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6'>
        <div className='flex items-baseline gap-1 sm:gap-2'>
          <span className='font-bold text-lg sm:text-2xl text-gray-800'>
            Tk{product.discountPrice.toFixed(2)}
          </span>
          {product.regularPrice &&
            product.regularPrice > product.discountPrice && (
              <span className='text-gray-500 line-through text-xs sm:text-sm'>
                Tk{product.regularPrice.toFixed(2)}
              </span>
            )}
        </div>
        {product.discountBadge && (
          <div className='py-0.5 sm:py-1 px-1.5 sm:px-2 bg-green-100 text-green-700 text-2xs sm:text-xs font-medium rounded-full'>
            {product.discountBadge}
          </div>
        )}
      </div>

      <div className='mb-4 sm:mb-6 bg-blue-50 p-2 sm:p-3 rounded-lg'>
        <p className='text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2'>
          Shipping calculated at checkout
        </p>
        <button className='text-xs sm:text-sm text-blue-600 hover:underline'>
          Add address
        </button>
      </div>

      {/* Color Options */}
      <ColorSelector
        colors={colors}
        initialColor={selectedColor}
        onChange={setSelectedColor}
      />

      {/* Size Options */}
      <SizeSelector
        sizes={sizes}
        initialSize={selectedSize}
        onChange={setSelectedSize}
      />

      {/* Quantity */}
      <div className='mb-4 sm:mb-6'>
        <div className='flex justify-between mb-2 sm:mb-3'>
          <span className='text-xs sm:text-sm font-semibold text-gray-700'>
            Quantity
          </span>
        </div>
        <QuantityAdjuster initialQuantity={quantity} onChange={setQuantity} />
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6'>
        <Button
          className='h-10 sm:h-12 rounded-md bg-green-600 hover:bg-green-700 flex-1 text-white font-medium shadow-sm flex items-center justify-center text-sm sm:text-base'
          onClick={handleAddToCart}
        >
          <ShoppingCart className='h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2' />
          Add to cart
        </Button>
        <Button
          variant='outline'
          className='h-10 sm:h-12 rounded-md border-gray-300 flex-1 text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center text-sm sm:text-base'
          onClick={handleBuyNow}
        >
          Buy now
        </Button>
      </div>
    </div>
  );
}
