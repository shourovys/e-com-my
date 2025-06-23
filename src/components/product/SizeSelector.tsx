'use client';

import { useState } from 'react';

interface SizeSelectorProps {
  sizes: string[];
  initialSize?: string;
  onChange?: (size: string) => void;
  className?: string;
}

export default function SizeSelector({
  sizes,
  initialSize = sizes[0],
  onChange,
  className = '',
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState(initialSize);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    onChange?.(size);
  };

  return (
    <div className={`mb-4 sm:mb-6 ${className}`}>
      <div className='flex justify-between mb-2 sm:mb-3'>
        <span className='text-xs sm:text-sm font-semibold text-gray-700'>
          Size
        </span>
        <span className='text-xs sm:text-sm text-gray-600'>{selectedSize}</span>
      </div>
      <div className='flex flex-wrap gap-1.5 sm:gap-2'>
        {sizes.map((size) => (
          <button
            key={size}
            className={`h-8 sm:h-10 min-w-[2.5rem] sm:min-w-[3rem] px-2 sm:px-3 rounded-md flex items-center justify-center text-xs sm:text-sm ${
              selectedSize === size
                ? 'ring-2 ring-blue-600 bg-blue-50'
                : 'hover:bg-gray-50 border border-gray-300'
            }`}
            onClick={() => handleSizeChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
