import Link from 'next/link';
import React from 'react';
import FallbackImage from './FallbackImage';

interface CategoryIconProps {
  icon: string;
  label: string;
  href: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ icon, label, href }) => {
  return (
    <Link
      href={href}
      className='flex flex-col items-center max-w-18 md:max-w-24 group'
    >
      <div className='size-16 sm:size-18 md:size-24 bg-white rounded-lg flex items-center mb-1 md:mb-2 overflow-hidden border border-gray-200 transition-shadow duration-200'>
        {typeof icon === 'string' ? (
          <FallbackImage
            src={icon}
            alt={label}
            width={160}
            height={160}
            className='group-hover:scale-110 transition-transform duration-300 p-4'
          />
        ) : (
          icon
        )}
      </div>
      <span className='text-xs md:text-sm text-center font-medium line-clamp-2'>
        {label}
      </span>
    </Link>
  );
};

export default CategoryIcon;
