import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function AboutPage() {
  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-6'>About Us</h1>

      <div className='prose prose-slate max-w-none'>
        <p className='text-lg mb-4'>
          Welcome to SynergyMart, your trusted destination for high-quality
          products at competitive prices. We strive to provide an exceptional
          shopping experience with a focus on customer satisfaction.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>Our Story</h2>
        <p>
          Founded in 2023, SynergyMart began with a simple mission: to create an
          online marketplace that connects customers with the products they
          love. What started as a small e-commerce venture has grown into a
          comprehensive platform offering thousands of products across multiple
          categories.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>Our Mission</h2>
        <p>
          At SynergyMart, our mission is to provide a seamless and enjoyable
          shopping experience by offering high-quality products, competitive
          prices, and exceptional customer service. We believe in transparency,
          integrity, and building lasting relationships with our customers.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>Our Values</h2>
        <ul className='list-disc pl-8 my-4 space-y-2'>
          <li>
            <strong>Customer First:</strong> We prioritize our customers&apos;
            needs and satisfaction in every decision we make.
          </li>
          <li>
            <strong>Quality:</strong> We are committed to offering only
            high-quality products that meet our strict standards.
          </li>
          <li>
            <strong>Integrity:</strong> We conduct our business with honesty,
            transparency, and ethical practices.
          </li>
          <li>
            <strong>Innovation:</strong> We continuously strive to improve our
            platform and services to enhance the shopping experience.
          </li>
          <li>
            <strong>Community:</strong> We believe in giving back to the
            communities we serve and supporting sustainable practices.
          </li>
        </ul>

        <h2 className='text-xl font-semibold mt-8 mb-4'>Our Team</h2>
        <p>
          SynergyMart is powered by a diverse team of passionate professionals
          dedicated to providing the best possible e-commerce experience. From
          our customer service representatives to our logistics experts, every
          team member plays a crucial role in ensuring your satisfaction.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>Contact Us</h2>
        <p className='mb-8'>
          Have questions or feedback? We&apos;d love to hear from you! Visit our{' '}
          <Link href='/contact' className='text-blue-600 hover:underline'>
            Contact page
          </Link>{' '}
          to get in touch with our team.
        </p>
      </div>

      <div className='mt-8 mb-4'>
        <Link href='/' passHref>
          <Button variant='outline'>Back to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}
