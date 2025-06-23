'use client';

import Link from 'next/link';
import React, { useState } from 'react';

interface Subcategory {
  id: string;
  name: string;
}

interface SubcategoryNavProps {
  categoryId: string;
  subcategories: Subcategory[];
  selectedSubcategoryId?: string | null;
}

const SubcategoryNav: React.FC<SubcategoryNavProps> = ({
  categoryId,
  subcategories,
  selectedSubcategoryId = null,
}) => {
  const [active, setActive] = useState<string | null>(selectedSubcategoryId);

  return (
    <div className='mb-4'>
      <h2 className='font-bold text-sm mb-2'>Subcategories</h2>
      <div className='flex overflow-x-auto py-1 -mx-2 px-2 gap-2 no-scrollbar'>
        <Link
          href={`/category/${categoryId}`}
          className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex-shrink-0 
            ${
              !active
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          onClick={() => setActive(null)}
        >
          All
        </Link>

        {subcategories &&
          subcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              href={`/category/${categoryId}?subcategory=${subcategory.id}`}
              className={`whitespace-nowrap px-3 py-1.5 max-w-[300px] truncate rounded-full text-sm font-medium transition-colors flex-shrink-0 
              ${
                active === subcategory.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActive(subcategory.id)}
              title={subcategory.name}
            >
              {subcategory.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SubcategoryNav;
