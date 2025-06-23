'use client';

import PageLoading from '@/components/common/PageLoading';
import ProductDescription from '@/components/product/ProductDescription';
import ProductHeader from '@/components/product/ProductHeader';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductReviews from '@/components/product/ProductReviews';
import RelatedProducts from '@/components/product/RelatedProducts';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import api from '@/lib/api';
import { Product } from '@/types/product';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // For demo purposes - in a real app these would come from the API
  const productImages = product
    ? [
        product.image,
        product.image,
        product.image,
        product.image,
        product.image,
      ]
    : [];

  // Available colors with hex codes
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Red', hex: '#d32f2f' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Gray', hex: '#9e9e9e' },
    { name: 'Blue', hex: '#2196f3' },
    { name: 'Beige', hex: '#f5f5dc' },
    { name: 'Brown', hex: '#795548' },
  ];

  // Available sizes
  const sizes = ['One Size'];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch product by ID
        const productId = params?.id?.toString();
        if (!productId) {
          router.push('/');
          return;
        }

        // Fetch product data
        const productData = await api.get<Product[]>('/products');
        const foundProduct = productData.find((p) => p.id === productId);

        if (!foundProduct) {
          router.push('/');
          return;
        }

        // Add mock data for demo
        const enhancedProduct = {
          ...foundProduct,
          brand: foundProduct.brand || 'Otto Cap',
          rating: foundProduct.rating || 5,
          reviewCount: foundProduct.reviewCount || 22,
        };

        setProduct(enhancedProduct);

        // Fetch similar products
        setSimilarProducts(
          productData.filter((p) => p.id !== productId).slice(0, 4)
        );
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params, router]);

  const handleAddToCart = (quantity: number, color: string, size: string) => {
    if (product) {
      addToCart(
        {
          id: product.id,
          image: product.image,
          title: product.title,
          discountPrice: product.discountPrice,
          regularPrice: product.regularPrice,
          hasOffer:
            product.regularPrice && product.regularPrice > product.discountPrice
              ? true
              : undefined,
        },
        quantity
      );
      // In a real app, we would use the color and size parameters
      // to select specific product variants
      console.log(`Selected color: ${color}, size: ${size}`);
    }
  };

  const handleBuyNow = (quantity: number, color: string, size: string) => {
    handleAddToCart(quantity, color, size);
    router.push('/checkout');
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (!product) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <h1 className='text-2xl font-bold'>Product not found</h1>
        <Button className='mt-4' onClick={() => router.push('/')}>
          Return to home
        </Button>
      </div>
    );
  }

  // Mock product details for demo
  const productDetails = [
    'Otto Cap Brand',
    '65% Polyester, 35% Cotton',
    '5-Panel Cap',
    'Branded Tag end on buckle',
    'Seamless front panel with Full Buckram',
    'Sewn Eyelets with matching Visor Color',
    '8 Rows Stitching on Visor',
    'Matching Color Sweatband',
    'Plastic Adjustable Closure',
  ];

  // Mock reviews for demo
  const reviews = [
    {
      id: 1,
      name: 'Jane Doe',
      rating: 5,
      date: 'January 15, 2023',
      title: 'Just as described',
      comment:
        'It can be whatever you want it to be. Perfect fit and exactly what I was looking for!',
    },
    {
      id: 2,
      name: 'John Smith',
      rating: 5,
      date: 'February 3, 2023',
      title: 'Fast shipping, quality product',
      comment: 'Will order again!',
    },
  ];

  return (
    <div className='pb-16 max-w-7xl mx-auto'>
      {/* Header */}
      <ProductHeader title='Product Details' />

      {/* Product Top Section - Image and Details */}
      <div className='bg-white'>
        <div className='w-full md:grid md:grid-cols-2 md:gap-8'>
          {/* Product Image Gallery */}
          <ProductImageGallery images={productImages} title={product.title} />

          {/* Product Info */}
          <ProductInfo
            product={product}
            colors={colors}
            sizes={sizes}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        </div>
      </div>

      {/* Product Description */}
      <ProductDescription
        description={product.description}
        details={productDetails}
      />

      {/* Ratings and Reviews */}
      <ProductReviews
        rating={product.rating || 5}
        reviewCount={product.reviewCount || 22}
        reviews={reviews}
      />

      {/* More from Brand */}
      <RelatedProducts
        title='More from Superfine'
        linkPath='/brand/superfine'
        linkText='See all'
        products={similarProducts}
      />

      {/* Related to Brand */}
      <RelatedProducts
        title='Related to Superfine'
        linkPath='/related/superfine'
        linkText='See all'
        products={similarProducts.slice(0, 2)}
      />
    </div>
  );
}
