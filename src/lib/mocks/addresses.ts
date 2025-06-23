// Define types for address data
export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  area: string;
  city: string;
  division: string;
  postalCode: string;
  landmark?: string;
  isDefault: boolean;
}

// Sample divisions in Bangladesh
export const bangladeshDivisions = [
  'Dhaka',
  'Chittagong',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
];

// Sample cities in Bangladesh
export const bangladeshCities = {
  Dhaka: ['Dhaka', 'Gazipur', 'Narayanganj', 'Savar'],
  Chittagong: ['Chittagong', "Cox's Bazar", 'Comilla', 'Feni'],
  Rajshahi: ['Rajshahi', 'Bogra', 'Pabna', 'Sirajganj'],
  Khulna: ['Khulna', 'Jessore', 'Kushtia', 'Satkhira'],
  Barisal: ['Barisal', 'Bhola', 'Patuakhali', 'Pirojpur'],
  Sylhet: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  Rangpur: ['Rangpur', 'Dinajpur', 'Kurigram', 'Thakurgaon'],
  Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'],
};

// Mock data for addresses
const mockAddresses: Address[] = [
  {
    id: 'addr-001',
    userId: '1', // This should match the mock user ID in AuthContext
    fullName: 'Test User',
    phone: '01712345678',
    streetAddress: 'House 42, Road 3',
    area: 'Banani',
    city: 'Dhaka',
    division: 'Dhaka',
    postalCode: '1213',
    landmark: 'Near City Bank',
    isDefault: true,
  },
  {
    id: 'addr-002',
    userId: '1',
    fullName: 'Test User',
    phone: '01712345678',
    streetAddress: 'Apartment 5B, Building 10',
    area: 'Gulshan',
    city: 'Dhaka',
    division: 'Dhaka',
    postalCode: '1212',
    isDefault: false,
  },
  {
    id: 'addr-003',
    userId: '1',
    fullName: 'Test User (Office)',
    phone: '01798765432',
    streetAddress: 'Suite 203, Green Tower',
    area: 'Mohakhali DOHS',
    city: 'Dhaka',
    division: 'Dhaka',
    postalCode: '1206',
    landmark: 'Opposite to Lake View Park',
    isDefault: false,
  },
];

// Function to fetch addresses for a user
export const fetchAddressesByUserId = (userId: string): Promise<Address[]> => {
  // Simulate API call with a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const userAddresses = mockAddresses.filter(
        (address) => address.userId === userId
      );
      resolve(userAddresses);
    }, 500);
  });
};

// Function to fetch a specific address by ID
export const fetchAddressById = (
  addressId: string
): Promise<Address | null> => {
  // Simulate API call with a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const address = mockAddresses.find((address) => address.id === addressId);
      resolve(address || null);
    }, 300);
  });
};

// Function to add a new address (simulation)
export const addAddress = (address: Omit<Address, 'id'>): Promise<Address> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAddress = {
        ...address,
        id: `addr-${Date.now()}`, // Generate a unique ID
      };
      console.log('New address added:', newAddress);
      resolve(newAddress);
    }, 500);
  });
};

// Function to update an address (simulation)
export const updateAddress = (address: Address): Promise<Address> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Address updated:', address);
      resolve(address);
    }, 500);
  });
};

// Function to delete an address (simulation)
export const deleteAddress = (addressId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Address deleted:', addressId);
      resolve(true);
    }, 500);
  });
};

export default mockAddresses;
