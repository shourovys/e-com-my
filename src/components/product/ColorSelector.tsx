'use client';

import { useState } from 'react';

interface ColorOption {
  name: string;
  hex: string;
}

interface ColorSelectorProps {
  colors: ColorOption[];
  initialColor?: string;
  onChange?: (color: string) => void;
  className?: string;
}

export default function ColorSelector({
  colors,
  initialColor = colors[0]?.name,
  onChange,
  className = '',
}: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(initialColor);

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    onChange?.(colorName);
  };

  return (
    <div className={`mb-4 sm:mb-6 ${className}`}>
      <div className='flex justify-between mb-2 sm:mb-3'>
        <span className='text-xs sm:text-sm font-semibold text-gray-700'>
          Color
        </span>
        <span className='text-xs sm:text-sm text-gray-600'>
          {selectedColor}
        </span>
      </div>
      <div className='flex flex-wrap gap-1.5 sm:gap-2'>
        {colors.map((color) => (
          <button
            key={color.name}
            className={`h-8 sm:h-10 px-2 sm:px-3 rounded-md flex items-center justify-center text-xs sm:text-sm ${
              selectedColor === color.name
                ? 'ring-2 ring-blue-600 bg-blue-50'
                : 'hover:bg-gray-50 border border-gray-300'
            }`}
            onClick={() => handleColorChange(color.name)}
            aria-label={`Select ${color.name} color`}
          >
            <span
              className='w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-sm'
              style={{
                backgroundColor: color.hex,
                border: color.name === 'White' ? '1px solid #ddd' : 'none',
              }}
            />
            <span className='truncate max-w-[60px] sm:max-w-none'>
              {color.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
