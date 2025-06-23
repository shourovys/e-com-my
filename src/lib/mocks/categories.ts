import { Category } from '../../types/product';

// Mock category data - using db.json data
export const mockCategories: Category[] = [
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
  {
    id: '5',
    name: 'Health & Beauty',
    slug: 'health-beauty',
    icon: 'https://cdn-icons-png.flaticon.com/512/2964/2964517.png',
  },
  {
    id: '6',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    icon: 'https://cdn-icons-png.flaticon.com/512/2936/2936886.png',
  },
  {
    id: '7',
    name: 'Toys & Games',
    slug: 'toys-games',
    icon: 'https://cdn-icons-png.flaticon.com/512/2753/2753546.png',
  },
  {
    id: '8',
    name: 'Books & Stationery',
    slug: 'books-stationery',
    icon: 'https://cdn-icons-png.flaticon.com/512/2702/2702134.png',
  },
  {
    id: '9',
    name: 'Category With Extremely Long Name That Might Break UI Layout',
    slug: 'very-long-category-name',
    icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077095.png',
  },
  {
    id: '10',
    name: 'Super Ultra Mega Extra Long Category Name With Multiple Words And Spaces To Really Test The Limits Of How The UI Handles Text Wrapping And Truncation In Navigation Elements Category Headers And Breadcrumbs',
    slug: 'extra-long-category-name',
    icon: 'https://cdn-icons-png.flaticon.com/512/3050/3050198.png',
  },
];

// Function to fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  // In a real app, this would be an API call
  return Promise.resolve(mockCategories);
};
