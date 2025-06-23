'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import CategoryIcon from '../common/CategoryIcon';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface HomepageCategoryGridProps {
  categories: Category[];
}

const HomepageCategoryGrid: React.FC<HomepageCategoryGridProps> = ({
  categories,
}) => {
  return (
    <section>
      <div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4 md:gap-6'>
        {categories.slice(0, 8).map((category) => (
          <CategoryIcon
            key={category.id}
            icon={category.icon}
            label={category.name}
            href={`/category/${category.id}`}
          />
        ))}
      </div>
      <div className='mt-4 text-center'>
        <Link
          href='/categories'
          className='flex items-center justify-center gap-1 text-gray-700 font-medium text-sm sm:text-base'
        >
          <span>View all categories</span>
          <ChevronDown size={20} className='ml-1' />
        </Link>
      </div>
    </section>
  );
};

export default HomepageCategoryGrid;
