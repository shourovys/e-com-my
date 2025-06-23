'use client';

import SubcategoryNav from '@/components/categories/SubcategoryNav';
import EmptyProductList from '@/components/common/EmptyProductList';
import PageLoading from '@/components/common/PageLoading';
import ProductListSection from '@/components/common/ProductListSection';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Subcategory {
  id: string;
  name: string;
}

interface Product {
  id: string;
  image: string;
  title: string;
  discountPrice: number;
  regularPrice?: number;
  discountBadge?: string;
  categoryId?: string;
  subcategoryId?: string;
}

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = params?.id?.toString() || '';
  const selectedSubcategory = searchParams?.get('subcategory') || null;

  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch category data on mount and when params change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all categories to find current one
        const categoriesData = await api.get<Category[]>('/categories');
        const currentCategory = categoriesData.find(
          (cat) => cat.id === categoryId
        );

        if (currentCategory) {
          setCategory(currentCategory);
        }

        // Fetch subcategories
        const subcategoriesData = await api.get<Subcategory[]>(
          '/subcategories'
        );
        setSubcategories(
          subcategoriesData.filter((sub) => sub.id.startsWith(categoryId + '-'))
        );

        // Fetch products
        const productsData = await api.get<Product[]>('/products');
        // Filter products by category (in a real app, this filtering would be done on the server)
        const categoryProducts = productsData.filter(
          (product) => product.categoryId === categoryId
        );
        setProducts(categoryProducts);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  // Filter products when subcategory changes
  useEffect(() => {
    if (selectedSubcategory) {
      setFilteredProducts(
        products.filter(
          (product) => product.subcategoryId === selectedSubcategory
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [selectedSubcategory, products]);

  if (isLoading) {
    return <PageLoading />;
  }

  if (!category) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <h1 className='text-2xl font-bold'>Category not found</h1>
        <Link href='/'>
          <Button className='mt-4'>Return to home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='pb-20'>
      {/* Header */}
      <header className='sticky top-0 bg-white z-10 border-b'>
        <div className='container mx-auto p-4 flex items-center justify-between'>
          <div className='flex items-center overflow-hidden'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => router.back()}
              className='mr-2 flex-shrink-0'
            >
              <ArrowLeft className='h-5 w-5' />
              <span className='sr-only'>Go back</span>
            </Button>
            <h1
              className='text-lg font-medium truncate max-w-[600px]'
              title={category.name}
            >
              {category.name}
            </h1>
          </div>

          <Button variant='ghost' size='icon' className='flex-shrink-0'>
            <SlidersHorizontal className='h-5 w-5' />
            <span className='sr-only'>Filter</span>
          </Button>
        </div>
      </header>

      {/* Subcategories */}
      <div className='container mx-auto px-4 py-4'>
        {subcategories.length > 0 && (
          <SubcategoryNav
            categoryId={categoryId}
            subcategories={subcategories}
            selectedSubcategoryId={selectedSubcategory}
          />
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <ProductListSection title='' products={filteredProducts} />
        ) : (
          <EmptyProductList
            message='No products found in this category'
            actionLabel='Browse Other Categories'
            onAction={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
}
