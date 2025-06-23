'use client';

import React from 'react';
import CategoryIcon from '../common/CategoryIcon';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 md:gap-6'>
      {categories.map((category) => (
        <CategoryIcon
          key={category.id}
          icon={category.icon}
          label={category.name}
          href={`/category/${category.id}`}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
