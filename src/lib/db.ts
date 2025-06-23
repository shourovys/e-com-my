'use server';

import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  discountPrice: number;
  regularPrice: number;
  image: string;
  categoryId: string;
  subcategoryId?: string;
  stockStatus: 'in_stock' | 'limited' | 'pre_order';
  isFeatured: boolean;
}

export interface ProductListItem {
  id: string;
  title: string;
  discountPrice: number;
  regularPrice: number;
  image: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  products: ProductListItem[];
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  discountPrice: number;
  title: string;
  image: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  total: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    area: string;
    city: string;
    instructions: string;
  };
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type Database = {
  users: User[];
  categories: Category[];
  subcategories: Subcategory[];
  products: Product[];
  'product-categories': ProductCategory[];
  carts: Cart[];
  me: UserProfile;
  offers: Offer[];
};

// Read the entire database
export async function getDB(): Promise<Database> {
  const data = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(data);
}

// Write the entire database
export async function writeDB(db: Database): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');
}

// Get all items from a collection
export async function getCollection<T>(
  collection: keyof Database
): Promise<T[]> {
  const db = await getDB();
  return db[collection] as T[];
}

// Get a single item from a collection by id
export async function getItem<T>(
  collection: keyof Database,
  id: string
): Promise<T | null> {
  const db = await getDB();
  const items = db[collection] as unknown as Array<{ id: string }>;

  if (!Array.isArray(items)) {
    return collection === 'me' ? (db[collection] as T) : null;
  }

  return (items.find((item) => item.id === id) as unknown as T) || null;
}

// Add an item to a collection
export async function addItem<T>(
  collection: keyof Database,
  item: T
): Promise<T> {
  const db = await getDB();

  if (collection === 'me') {
    db[collection] = item as unknown as UserProfile;
  } else {
    (db[collection] as unknown as T[]).push(item);
  }

  await writeDB(db);
  return item;
}

// Update an item in a collection
export async function updateItem<T extends { id?: string }>(
  collection: keyof Database,
  id: string,
  updates: Partial<T>
): Promise<T | null> {
  const db = await getDB();

  if (collection === 'me') {
    db[collection] = { ...db[collection], ...updates };
    await writeDB(db);
    return db[collection] as unknown as T;
  }

  const items = db[collection] as unknown as T[];
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) return null;

  items[index] = { ...items[index], ...updates };
  await writeDB(db);

  return items[index];
}

// Delete an item from a collection
export async function deleteItem(
  collection: keyof Database,
  id: string
): Promise<boolean> {
  if (collection === 'me') return false;

  const db = await getDB();
  const items = db[collection] as unknown as Array<{ id: string }>;
  const initialLength = items.length;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db[collection] = items.filter((item) => item.id !== id) as any;

  if (initialLength === db[collection].length) return false;

  await writeDB(db);
  return true;
}
