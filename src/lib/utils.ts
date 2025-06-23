import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string, using clsx and tailwind-merge
 * to handle conditional classes and resolve conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as a currency string in BDT (Bangladeshi Taka)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
