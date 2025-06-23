'use client';

import { ChevronRight, Home, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from '../../../components/common/ProductCard';
import { Button } from '../../../components/ui/button';
import api from '../../../lib/api';

interface Category {
  id: string;
  name: string;
  slug: string;
  iconUrl: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  categoryId: string;
  stockStatus: 'in_stock' | 'out_of_stock';
}

export default function CategoryPage() {
  const params = useParams();
  const id = params?.id as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchCategoryAndProducts() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch category details based on id
        const categoryResponse = await api.get<Category[]>(
          `/categories?id=${id}`
        );

        if (!categoryResponse || categoryResponse.length === 0) {
          setError('Category not found');
          setIsLoading(false);
          return;
        }

        const categoryData = categoryResponse[0];
        setCategory(categoryData);

        // Fetch products for this category
        const productsResponse = await api.get<Product[]>(
          `/products?categoryId=${categoryData.id}&_page=${page}&_limit=${limit}`
        );

        setProducts((prev) =>
          page === 1 ? productsResponse : [...prev, ...productsResponse]
        );

        // Check if there are more products to load
        setHasMore(productsResponse.length === limit);
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError('Failed to load category and products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategoryAndProducts();
  }, [id, page, limit]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading && page === 1) {
    return (
      <div className='container mx-auto px-4 py-16 flex items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-16 text-center'>
        <h1 className='text-2xl font-bold text-red-500 mb-4'>{error}</h1>
        <Link href='/'>
          <Button>Return to Homepage</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Breadcrumb Navigation */}
      <nav className='flex items-center text-sm text-gray-500 mb-6'>
        <Link href='/' className='flex items-center hover:text-gray-900'>
          <Home className='h-4 w-4 mr-1' />
          Home
        </Link>
        <ChevronRight className='h-4 w-4 mx-2' />
        <span className='font-medium text-gray-900'>{category?.name}</span>
      </nav>

      {/* Category Title */}
      <h1 className='text-3xl font-bold mb-8'>{category?.name}</h1>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500'>No products found in this category.</p>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.imageUrl}
                title={product.name}
                discountPrice={product.price}
                regularPrice={product.originalPrice}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className='flex justify-center mt-8'>
              <Button
                onClick={handleLoadMore}
                variant='outline'
                disabled={isLoading}
                className='flex items-center gap-2'
              >
                {isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
