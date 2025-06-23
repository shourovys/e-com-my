import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function TermsAndConditionsPage() {
  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-6'>Terms and Conditions</h1>

      <div className='prose prose-slate max-w-none'>
        <p className='text-lg mb-4'>
          Welcome to SynergyMart. By using our website and services, you agree
          to comply with and be bound by the following terms and conditions.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or using SynergyMart, you agree to be bound by these
          Terms and Conditions and all applicable laws and regulations. If you
          do not agree with any of these terms, you are prohibited from using or
          accessing this site.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the
          materials on SynergyMart&apos;s website for personal, non-commercial
          transitory viewing only. This is the grant of a license, not a
          transfer of title, and under this license you may not:
        </p>
        <ul className='list-disc pl-8 my-4 space-y-2'>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose</li>
          <li>
            Attempt to decompile or reverse engineer any software contained on
            SynergyMart&apos;s website
          </li>
          <li>
            Remove any copyright or other proprietary notations from the
            materials
          </li>
          <li>
            Transfer the materials to another person or &quot;mirror&quot; the
            materials on any other server
          </li>
        </ul>

        <h2 className='text-xl font-semibold mt-8 mb-4'>
          3. Account Registration
        </h2>
        <p>
          To use certain features of our service, you may be required to
          register for an account. You agree to provide accurate, current, and
          complete information during the registration process and to update
          such information to keep it accurate, current, and complete.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>
          4. Ordering and Payment
        </h2>
        <p>
          All orders placed through our site are subject to acceptance and
          availability. We reserve the right to refuse any order without giving
          a reason. When placing an order, you agree to pay the prices listed at
          the time of purchase, including any applicable taxes and delivery
          fees.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>
          5. Delivery and Returns
        </h2>
        <p>
          SynergyMart aims to deliver products within the timeframes indicated
          on our website. However, delivery times are estimates and not
          guaranteed. Our return policy allows for returns within 7 days of
          receiving your order, provided the items are in their original
          condition and packaging.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>6. Disclaimer</h2>
        <p>
          The materials on SynergyMart&apos;s website are provided on an
          &apos;as is&apos; basis. SynergyMart makes no warranties, expressed or
          implied, and hereby disclaims and negates all other warranties
          including, without limitation, implied warranties or conditions of
          merchantability, fitness for a particular purpose, or non-infringement
          of intellectual property or other violation of rights.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>7. Limitations</h2>
        <p>
          In no event shall SynergyMart or its suppliers be liable for any
          damages (including, without limitation, damages for loss of data or
          profit, or due to business interruption) arising out of the use or
          inability to use the materials on SynergyMart&apos;s website, even if
          SynergyMart or a SynergyMart authorized representative has been
          notified orally or in writing of the possibility of such damage.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>8. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws, and you irrevocably submit to the exclusive
          jurisdiction of the courts in that location.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>9. Changes to Terms</h2>
        <p>
          SynergyMart reserves the right, at its sole discretion, to modify or
          replace these Terms at any time. It is your responsibility to check
          our Terms periodically for changes. Your continued use of the Service
          following the posting of any changes to these Terms constitutes
          acceptance of those changes.
        </p>

        <h2 className='text-xl font-semibold mt-8 mb-4'>
          10. Contact Information
        </h2>
        <p className='mb-8'>
          If you have any questions about these Terms, please contact us at
          support@synergymart.com.
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
