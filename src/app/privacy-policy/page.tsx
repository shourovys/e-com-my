import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function PrivacyPolicyPage() {
  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-6'>Privacy Policy</h1>

      <div className='prose prose-slate max-w-none'>
        <p className='text-lg mb-4'>
          At SynergyMart, we take your privacy seriously. This Privacy Policy
          describes how we collect, use, and protect your personal information
          when you use our website and services.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>
          1. Information We Collect
        </h2>
        <p>
          We collect information when you register on our site, place an order,
          subscribe to communications, or fill out a form. The information we
          collect may include:
        </p>
        <ul className='list-disc pl-8 my-4 space-y-2'>
          <li>
            Personal information such as name, email address, phone number, and
            delivery address
          </li>
          <li>
            Payment information (processed securely through our payment
            processors)
          </li>
          <li>Order history and preferences</li>
          <li>
            Device information including IP address, browser type, and device
            type
          </li>
          <li>Usage data on how you interact with our website</li>
        </ul>

        <h2 className='text-xl font-semibold mt-8 mb-4'>
          2. How We Use Your Information
        </h2>
        <p>
          We use the information we collect for various purposes, including:
        </p>
        <ul className='list-disc pl-8 my-4 space-y-2'>
          <li>Processing and fulfilling your orders</li>
          <li>Managing your account and providing customer support</li>
          <li>Sending order confirmations and updates</li>
          <li>Improving our website and services</li>
          <li>Personalizing your shopping experience</li>
          <li>
            Sending promotional emails and offers (if you&apos;ve opted in)
          </li>
          <li>Preventing fraud and ensuring website security</li>
        </ul>

        <h2 className='text-xl font-semibold mt-8 mb-4'>
          3. Information Sharing and Disclosure
        </h2>
        <p>
          We do not sell, trade, or otherwise transfer your personally
          identifiable information to third parties without your consent, except
          in the following circumstances:
        </p>
        <ul className='list-disc pl-8 my-4 space-y-2'>
          <li>
            With trusted third parties who assist us in operating our website,
            conducting our business, or servicing you (e.g., payment processors,
            delivery partners)
          </li>
          <li>When required by law or to protect our rights</li>
          <li>
            In the event of a merger, acquisition, or sale of all or a portion
            of our assets
          </li>
        </ul>

        <h2 className='text-xl font-semibold mt-8 mb-4'>4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal
          information against unauthorized access, alteration, disclosure, or
          destruction. However, no method of transmission over the Internet or
          electronic storage is 100% secure, and we cannot guarantee absolute
          security.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>
          5. Cookies and Tracking Technologies
        </h2>
        <p>
          We use cookies and similar tracking technologies to collect
          information about your browsing activities and preferences. These
          technologies help us understand how users interact with our website,
          remember your preferences, and improve your experience.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>
          6. Your Rights and Choices
        </h2>
        <p>
          Depending on your location, you may have certain rights regarding your
          personal information, including:
        </p>
        <ul className='list-disc pl-8 my-4 space-y-2'>
          <li>Accessing, correcting, or deleting your personal information</li>
          <li>Objecting to or restricting certain processing activities</li>
          <li>Requesting a copy of your personal data</li>
          <li>Withdrawing consent for optional processing activities</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the information
          provided below.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>
          7. Children&apos;s Privacy
        </h2>
        <p>
          Our services are not intended for use by children under the age of 13,
          and we do not knowingly collect personal information from children
          under 13. If we discover that we have collected personal information
          from a child under 13, we will promptly delete it.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>
          8. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. The date of the
          latest revision will be indicated at the bottom of the policy. We
          encourage you to review this Privacy Policy periodically.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>9. Contact Us</h2>
        <p className='mb-8'>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at privacy@synergymart.com.
        </p>

        <p className='text-sm text-muted-foreground mt-8'>
          Last updated: May 1, 2025
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
