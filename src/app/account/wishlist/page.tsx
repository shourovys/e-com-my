'use client';

import EmptyProductList from '@/components/common/EmptyProductList';
import ProductCard from '@/components/common/ProductCard';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/lib/db';
import { fetchProductsByIds } from '@/lib/mocks/products';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { productIds, isLoading: isWishlistLoading } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWishlistProducts = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Only fetch if there are product IDs
        if (productIds.length > 0) {
          const fetchedProducts = await fetchProductsByIds(productIds);
          setProducts(fetchedProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only load products when wishlist has finished loading
    if (!isWishlistLoading) {
      loadWishlistProducts();
    }
  }, [productIds, isAuthenticated, isWishlistLoading]);

  // Show loading state
  if (isLoading || isWishlistLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-center'>
          <div className='w-10 h-10 border-t-2 border-primary border-solid rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  // Show empty state if no products
  if (products.length === 0) {
    return (
      <EmptyProductList
        message='Your wishlist is empty. Add items to easily find and purchase them later.'
        actionLabel='Continue Shopping'
        onAction={() => router.push('/')}
      />
    );
  }

  // Show products grid
  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>My Wishlist</h1>

      <p className='text-gray-600 mb-6'>
        {products.length} {products.length === 1 ? 'item' : 'items'} in your
        wishlist
      </p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            discountPrice={product.discountPrice}
            regularPrice={product.regularPrice}
            image={product.image}
            rating={4.5} // Placeholder rating
          />
        ))}
      </div>
    </div>
  );
}
