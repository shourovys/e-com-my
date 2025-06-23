'use client';

import EmptyProductList from '@/components/common/EmptyProductList';
import ProductListSection from '@/components/common/ProductListSection';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface Product {
  id: string;
  image: string;
  title: string;
  discountPrice: number;
  regularPrice?: number;
  discountBadge?: string;
}

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('query') || '';

  // const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const savedSearches = localStorage.getItem('recentSearches');
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error('Failed to load recent searches:', error);
    }
  }, []);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsData = await api.get<Product[]>('/products');
        setProducts(productsData || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search products when query changes
  useEffect(() => {
    const performSearch = (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      const lowerCaseQuery = query.toLowerCase();

      // Filter products that match the search query
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(lowerCaseQuery)
      );

      setSearchResults(results);

      // Save to recent searches
      if (query.trim() && !recentSearches.includes(query)) {
        const updatedSearches = [query, ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
    };

    if (initialQuery) {
      performSearch(initialQuery);
    } else {
      setSearchResults([]);
    }
  }, [initialQuery, products, recentSearches]);

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  // };

  // const handleClearSearch = () => {
  //   setSearchQuery('');
  //   router.push('/search');
  // };

  const handleRecentSearchClick = (query: string) => {
    // setSearchQuery(query);
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className='pb-20'>
      {/* Header */}
      {/*  <header className='sticky top-0 bg-white z-10 border-b'>
        <div className='container mx-auto p-4 flex items-center'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => router.back()}
            className='mr-2'
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='sr-only'>Go back</span>
          </Button>

          <form onSubmit={handleSearch} className='flex-1 flex'>
            <div className='relative w-full'>
              <Input
                type='text'
                placeholder='Search products...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-10 pr-10'
                autoFocus
              />
              <SearchIcon className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
              {searchQuery && (
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='absolute right-0 top-0 h-9 w-9'
                  onClick={handleClearSearch}
                >
                  <XCircle className='h-4 w-4' />
                  <span className='sr-only'>Clear search</span>
                </Button>
              )}
            </div>
            <Button type='submit' className='ml-2'>
              Search
            </Button>
          </form>
        </div>
      </header> */}

      {/* Search Results or Recent Searches */}
      <div className='container mx-auto px-4 py-4'>
        {isLoading ? (
          <div className='flex justify-center items-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
          </div>
        ) : initialQuery ? (
          <>
            <h2 className='text-lg font-medium mb-4'>
              {searchResults.length > 0
                ? `${searchResults.length} results for "${initialQuery}"`
                : `No results for "${initialQuery}"`}
            </h2>

            {searchResults.length > 0 ? (
              <ProductListSection title='' products={searchResults} />
            ) : (
              <EmptyProductList
                message='No products found matching your search'
                actionLabel='Browse Categories'
                onAction={() => router.push('/')}
              />
            )}
          </>
        ) : (
          <div className='py-6'>
            {recentSearches.length > 0 && (
              <div className='mb-8'>
                <h2 className='text-lg font-medium mb-4'>Recent Searches</h2>
                <div className='space-y-2'>
                  {recentSearches.map((query, index) => (
                    <Button
                      key={index}
                      variant='outline'
                      className='mr-2 mb-2'
                      onClick={() => handleRecentSearchClick(query)}
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <h2 className='text-lg font-medium mb-4'>Popular Products</h2>
            <ProductListSection title='' products={products.slice(0, 8)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center py-12'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
