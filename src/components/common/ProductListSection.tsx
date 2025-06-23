'use client';

import Link from 'next/link';
import React from 'react';
import EmptyProductList from './EmptyProductList';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  image: string;
  title: string;
  discountPrice: number;
  regularPrice?: number;
  discountBadge?: string;
}

interface ProductListSectionProps {
  title: string;
  viewAllLink?: string;
  products?: Product[];
  emptyMessage?: string;
}

const ProductListSection: React.FC<ProductListSectionProps> = ({
  title,
  viewAllLink = '#',
  products = [],
  emptyMessage,
}) => {
  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <section className='my-8'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold text-gray-800 max-w-[500px] truncate'>
          {title}
        </h2>
        {hasProducts && viewAllLink !== '#' && (
          <Link href={viewAllLink} className='text-sm text-gray-600'>
            View all
          </Link>
        )}
      </div>

      {hasProducts ? (
        /* Mobile: Horizontal scroll, Desktop: Grid */
        <div className='flex overflow-x-auto gap-x-3 gap-y-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-4 md:gap-y-5 lg:gap-5 xl:gap-6 scrollbar-hide'>
          {products.map((product) => (
            <div
              key={product.id}
              className='min-w-[170px] w-[170px] flex-shrink-0 md:w-full'
            >
              <ProductCard
                id={product.id}
                image={product.image}
                title={product.title}
                discountPrice={product.discountPrice}
                regularPrice={product.regularPrice}
                discountBadge={product.discountBadge}
                rating={0}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyProductList message={emptyMessage} />
      )}
    </section>
  );
};

export default ProductListSection;
