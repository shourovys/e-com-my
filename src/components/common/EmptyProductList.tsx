import { ShoppingBag } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface EmptyProductListProps {
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyProductList: React.FC<EmptyProductListProps> = ({
  message = 'No products available at the moment.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
      <div className='w-20 h-20 mb-6 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-full shadow-sm animate-[fade-in_0.5s_ease-out]'>
        <ShoppingBag className='w-10 h-10 text-primary' strokeWidth={1.5} />
      </div>

      <h3 className='text-lg font-medium text-gray-800 mb-2'>{message}</h3>
      <p className='text-gray-500 text-sm max-w-md mx-auto mb-6'>
        Check back later for new items or explore our featured collections.
      </p>

      {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
};

export default EmptyProductList;
