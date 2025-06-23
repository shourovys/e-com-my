// Define types for order data
export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  streetAddress: string;
  area: string;
  city: string;
  division: string;
  postalCode: string;
  landmark?: string;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  deliveryMethod: string;
  deliveryFee: number;
}

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: 'ORD-001-2023',
    userId: '1', // This should match the mock user ID in AuthContext
    date: '2023-11-15T14:30:00',
    total: 4550,
    status: 'Delivered',
    items: [
      {
        id: '1',
        title: 'Wireless Bluetooth Earbuds',
        price: 1200,
        quantity: 1,
        image: '/placeholder-image.svg',
      },
      {
        id: '5',
        title: 'Smart Watch with Heart Rate Monitor',
        price: 3350,
        quantity: 1,
        image: '/placeholder-image.svg',
      },
    ],
    shippingAddress: {
      fullName: 'Test User',
      phone: '01712345678',
      streetAddress: 'House 42, Road 3',
      area: 'Banani',
      city: 'Dhaka',
      division: 'Dhaka',
      postalCode: '1213',
      landmark: 'Near City Bank',
    },
    paymentMethod: 'Cash on Delivery',
    deliveryMethod: 'Standard Delivery',
    deliveryFee: 50,
  },
  {
    id: 'ORD-002-2023',
    userId: '1',
    date: '2023-12-20T10:15:00',
    total: 8900,
    status: 'Shipped',
    items: [
      {
        id: '3',
        title: 'Premium Smartphone Case',
        price: 650,
        quantity: 2,
        image: '/placeholder-image.svg',
      },
      {
        id: '6',
        title: 'Ultra HD Smart TV',
        price: 7600,
        quantity: 1,
        image: '/placeholder-image.svg',
      },
    ],
    shippingAddress: {
      fullName: 'Test User',
      phone: '01712345678',
      streetAddress: 'House 42, Road 3',
      area: 'Banani',
      city: 'Dhaka',
      division: 'Dhaka',
      postalCode: '1213',
      landmark: 'Near City Bank',
    },
    paymentMethod: 'bKash',
    deliveryMethod: 'Express Delivery',
    deliveryFee: 120,
  },
  {
    id: 'ORD-003-2024',
    userId: '1',
    date: '2024-01-05T16:45:00',
    total: 2340,
    status: 'Processing',
    items: [
      {
        id: '2',
        title: 'Portable Power Bank 10000mAh',
        price: 1150,
        quantity: 1,
        image: '/placeholder-image.svg',
      },
      {
        id: '4',
        title: 'Wireless Charging Pad',
        price: 850,
        quantity: 1,
        image: '/placeholder-image.svg',
      },
      {
        id: '7',
        title: 'USB Type-C Fast Charging Cable',
        price: 340,
        quantity: 1,
        image: '/placeholder-image.svg',
      },
    ],
    shippingAddress: {
      fullName: 'Test User',
      phone: '01712345678',
      streetAddress: 'Apartment 5B, Building 10',
      area: 'Gulshan',
      city: 'Dhaka',
      division: 'Dhaka',
      postalCode: '1212',
    },
    paymentMethod: 'Cash on Delivery',
    deliveryMethod: 'Standard Delivery',
    deliveryFee: 50,
  },
  {
    id: 'ORD-004-2024',
    userId: '1',
    date: '2024-02-18T09:20:00',
    total: 5600,
    status: 'Cancelled',
    items: [
      {
        id: '8',
        title: 'Noise Cancelling Headphones',
        price: 5600,
        quantity: 1,
        image: '/placeholder-image.svg',
      },
    ],
    shippingAddress: {
      fullName: 'Test User',
      phone: '01712345678',
      streetAddress: 'House 42, Road 3',
      area: 'Banani',
      city: 'Dhaka',
      division: 'Dhaka',
      postalCode: '1213',
      landmark: 'Near City Bank',
    },
    paymentMethod: 'bKash',
    deliveryMethod: 'Express Delivery',
    deliveryFee: 120,
  },
];

// Function to fetch orders for a user
export const fetchOrdersByUserId = (userId: string): Promise<Order[]> => {
  // Simulate API call with a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const userOrders = mockOrders.filter((order) => order.userId === userId);
      resolve(userOrders);
    }, 500);
  });
};

// Function to fetch a specific order by ID
export const fetchOrderById = (orderId: string): Promise<Order | null> => {
  // Simulate API call with a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = mockOrders.find((order) => order.id === orderId);
      resolve(order || null);
    }, 300);
  });
};

export default mockOrders;
