import React from 'react';

interface DiscountBadgeProps {
  children: React.ReactNode;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ children }) => {
  return (
    <div className='py-1 px-2 bg-primary/10 text-primary text-xs font-medium w-fit rounded-full'>
      {children}
    </div>
  );
};

export default DiscountBadge;
