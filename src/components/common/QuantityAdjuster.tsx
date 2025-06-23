'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface QuantityAdjusterProps {
  initialQuantity?: number;
  min?: number;
  max?: number;
  onChange?: (quantity: number) => void;
  showRemove?: boolean;
  onRemove?: () => void;
  className?: string;
}

const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({
  initialQuantity = 1,
  min = 1,
  max = 99,
  onChange,
  showRemove = false,
  onRemove,
  className = '',
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const increment = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const decrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove?.();
  };

  return (
    <div className={`flex items-center ${className}`}>
      {showRemove && (
        <Button
          variant='outline'
          size='icon'
          className='h-9 w-9 sm:h-10 sm:w-10 rounded-md border-gray-300 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 mr-2'
          onClick={handleRemove}
        >
          <Trash2 size={16} className='sm:size-[18px]' />
          <span className='sr-only'>Remove item</span>
        </Button>
      )}
      <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm'>
        <button
          className={`h-9 sm:h-10 w-10 sm:w-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border-r border-gray-300 ${
            quantity <= min ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={decrement}
          disabled={quantity <= min}
        >
          <Minus size={14} className='sm:size-[16px]' />
        </button>
        <div className='h-9 sm:h-10 w-10 sm:w-14 flex items-center justify-center bg-white'>
          <span className='font-medium text-gray-800 text-sm sm:text-base'>
            {quantity}
          </span>
        </div>
        <button
          className={`h-9 sm:h-10 w-10 sm:w-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border-l border-gray-300 ${
            quantity >= max ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={increment}
          disabled={quantity >= max}
        >
          <Plus size={14} className='sm:size-[16px]' />
        </button>
      </div>
    </div>
  );
};

export default QuantityAdjuster;
