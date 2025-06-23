import CategoryGrid from '@/components/categories/CategoryGrid';
import { Button } from '@/components/ui/button';
import { fetchCategories } from '@/lib/mocks/categories';
import Link from 'next/link';

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl md:text-3xl font-bold mb-8'>All Categories</h1>

      <div className='mb-8'>
        <CategoryGrid categories={categories} />
      </div>

      <div className='mt-8 mb-4'>
        <Link href='/' passHref>
          <Button variant='outline'>Back to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}
