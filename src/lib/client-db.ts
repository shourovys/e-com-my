'use client';

// Import JSON directly with a dynamic import that works in client components
import type { Database } from './db';

// Mock database for client-side use
const db: Database = {
  users: [
    {
      id: '1',
      email: 'user@example.com',
      password: 'password123',
      name: 'Test User',
    },
    {
      id: '2',
      email: 'jane.doe@example.com',
      password: 'securepass456',
      name: 'Jane Doe',
    },
  ],
  categories: [
    {
      id: '1',
      name: 'Groceries',
      slug: 'groceries',
      icon: 'https://cdn-icons-png.flaticon.com/512/2749/2749678.png',
    },
    {
      id: '2',
      name: 'Electronics',
      slug: 'electronics',
      icon: 'https://cdn-icons-png.flaticon.com/512/3659/3659898.png',
    },
    {
      id: '3',
      name: 'Fashion',
      slug: 'fashion',
      icon: 'https://cdn-icons-png.flaticon.com/512/2784/2784487.png',
    },
    {
      id: '4',
      name: 'Home & Kitchen',
      slug: 'home-kitchen',
      icon: 'https://cdn-icons-png.flaticon.com/512/2827/2827266.png',
    },
  ],
  subcategories: [
    {
      id: '1-1',
      name: 'Fruits & Vegetables',
    },
    {
      id: '2-1',
      name: 'Smartphones',
    },
    {
      id: '2-2',
      name: 'Laptops',
    },
  ],
  products: [
    {
      id: '1',
      title: 'Fresh Apples',
      description: 'Sweet and crisp apples, perfect for snacking or baking.',
      discountPrice: 150,
      regularPrice: 180,
      image:
        'https://images.unsplash.com/photo-1569870499705-504209102861?auto=format&fit=crop&w=300&q=80',
      categoryId: '1',
      subcategoryId: '1-1',
      stockStatus: 'in_stock',
      isFeatured: true,
    },
    {
      id: '2',
      title: 'Organic Bananas',
      description: 'Naturally sweet and nutritious organic bananas.',
      discountPrice: 120,
      regularPrice: 120,
      image:
        'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80',
      categoryId: '1',
      subcategoryId: '1-1',
      stockStatus: 'in_stock',
      isFeatured: false,
    },
    {
      id: '3',
      title: 'Wireless Earbuds',
      description:
        'Premium wireless earbuds with noise cancellation and long battery life.',
      discountPrice: 2999,
      regularPrice: 3500,
      image:
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80',
      categoryId: '2',
      subcategoryId: '2-1',
      stockStatus: 'in_stock',
      isFeatured: true,
    },
    {
      id: '4',
      title: 'Smart Watch',
      description:
        'Track your fitness and stay connected with this stylish smart watch.',
      discountPrice: 4500,
      regularPrice: 5000,
      image:
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=300&q=80',
      categoryId: '2',
      subcategoryId: '2-1',
      stockStatus: 'in_stock',
      isFeatured: true,
    },
    {
      id: '5',
      title: "Men's T-Shirt",
      description: 'Comfortable cotton t-shirt for everyday wear.',
      discountPrice: 799,
      regularPrice: 999,
      image:
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=300&q=80',
      categoryId: '3',
      subcategoryId: '3-1',
      stockStatus: 'in_stock',
      isFeatured: false,
    },
    {
      id: '6',
      title: "Women's Dress",
      description: 'Elegant dress for special occasions.',
      discountPrice: 2499,
      regularPrice: 2999,
      image:
        'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=300&q=80',
      categoryId: '3',
      subcategoryId: '3-2',
      stockStatus: 'in_stock',
      isFeatured: true,
    },
  ],
  'product-categories': [],
  carts: [],
  me: {
    id: '1',
    name: 'Test User',
    email: 'user@example.com',
    address: {
      street: '123 Main St',
      area: 'Downtown',
      city: 'Dhaka',
      instructions: 'Ring the doorbell',
    },
  },
  offers: [
    {
      id: '1',
      title: 'Free Shipping',
      description: 'On orders over 1000 Tk',
      icon: 'truck',
    },
    {
      id: '2',
      title: 'Easy Returns',
      description: '30-day return policy',
      icon: 'refresh-cw',
    },
  ],
};

export default db;
