'use client';

import ProductCard from '@/components/common/ProductCard';
import { Product } from '@/types/product';
import Link from 'next/link';

interface RelatedProductsProps {
  title: string;
  linkPath: string;
  linkText: string;
  products: Product[];
}

export default function RelatedProducts({
  title,
  linkPath,
  linkText,
  products,
}: RelatedProductsProps) {
  return (
    <section className='py-6 border-t px-4 bg-white mt-3'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center mb-5'>
          <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
          <Link
            href={linkPath}
            className='text-sm text-blue-600 hover:underline'
          >
            {linkText}
          </Link>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4'>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              discountPrice={product.discountPrice}
              regularPrice={product.regularPrice}
              discountBadge={product.discountBadge}
              rating={0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
