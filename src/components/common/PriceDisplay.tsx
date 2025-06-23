import React from 'react';

interface PriceDisplayProps {
  discountPrice: number;
  regularPrice?: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  discountPrice,
  regularPrice,
}) => {
  const hasDiscount =
    discountPrice && regularPrice && discountPrice !== regularPrice;

  return (
    <div className='flex items-center gap-1'>
      <span className='font-semibold text-base'>Tk {discountPrice}</span>
      {hasDiscount && (
        <span className='text-gray-500 line-through text-xs'>
          Tk {regularPrice}
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
