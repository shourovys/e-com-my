'use client';

import PageLoading from '@/components/common/PageLoading';
import { useEffect, useState } from 'react';
import ProductListSection from '../components/common/ProductListSection';
import HomepageBannerCarousel from '../components/homepage/HomepageBannerCarousel';
import HomepageCategoryGrid from '../components/homepage/HomepageCategoryGrid';
import HomepageOffers from '../components/homepage/HomepageOffers';
import { apiService, notificationService } from '../services';

interface Category {
  id: string;
  name: string;
  icon: string;
}

// This matches our API/DB structure
interface ApiProduct {
  id: string;
  image: string;
  title: string;
  discountPrice: number;
  regularPrice?: number;
  categoryId: string;
  isFeatured?: boolean;
}

// This matches what ProductListSection expects
interface ProductListItem {
  id: string;
  image: string;
  title: string;
  discountPrice: number;
  regularPrice?: number;
  discountBadge?: string;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ProductCategory {
  id: string;
  title: string;
  products: ProductListItem[];
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  // Adapter function to convert API product to ProductListItem
  const mapToProductListItem = (product: ApiProduct): ProductListItem => ({
    id: product.id,
    image: product.image,
    title: product.title,
    discountPrice: product.discountPrice,
    regularPrice: product.regularPrice,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Show loading notification
      const loadingToastId = notificationService.loading('Loading products...');

      try {
        // Fetch categories, products, and offers from API
        const categoriesData = await apiService.get<Category[]>('/categories');
        const productsData = await apiService.get<ApiProduct[]>('/products');
        const offersData = await apiService.get<Offer[]>('/offers');

        // Check if the product-categories endpoint exists in the mock API
        let productCategoriesData: ProductCategory[] = [];
        try {
          productCategoriesData = await apiService.get<ProductCategory[]>(
            '/product-categories'
          );
        } catch {
          // If not available, we'll create categories from existing products
          console.log(
            'Product categories endpoint not available, using products data instead'
          );

          // Group products by category
          const groupedProducts = productsData.reduce<
            Record<string, ApiProduct[]>
          >((acc, product) => {
            if (!acc[product.categoryId]) {
              acc[product.categoryId] = [];
            }
            acc[product.categoryId].push(product);
            return acc;
          }, {});

          // Convert grouped products to product categories
          productCategoriesData = Object.entries(groupedProducts).map(
            ([categoryId, products]) => {
              const category = categoriesData.find((c) => c.id === categoryId);
              return {
                id: categoryId,
                title: category?.name || 'Other Products',
                products: products.map(mapToProductListItem),
              };
            }
          );
        }

        setCategories(categoriesData || []);
        setOffers(offersData || []);
        setProductCategories(productCategoriesData || []);

        // Show success notification
        notificationService.loadingToSuccess(
          loadingToastId,
          'Products loaded successfully!'
        );
      } catch (error) {
        console.error('Error fetching data:', error);
        // Show error notification
        notificationService.loadingToError(
          loadingToastId,
          'Error loading products. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className='pb-20 container mx-auto px-4 space-y-6 md:space-y-10'>
      {/* Banner Carousel */}
      <HomepageBannerCarousel className='mt-6' />

      {/* Offer Cards */}
      <HomepageOffers offers={offers} />

      {/* Category Icons */}
      <HomepageCategoryGrid categories={categories} />

      {/* Other Product Categories */}
      {productCategories.map((category) => (
        <ProductListSection
          key={category.id}
          title={category.title}
          viewAllLink={`/category/${category.id}`}
          products={category.products}
        />
      ))}
    </div>
  );
}
