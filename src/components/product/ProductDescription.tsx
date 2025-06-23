'use client';

import { useState } from 'react';

interface ProductDescriptionProps {
  description?: string;
  details?: string[];
}

export default function ProductDescription({
  description,
  details = [],
}: ProductDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className='py-6 border-t px-4 bg-white mt-3'>
      <div className='max-w-3xl mx-auto'>
        <h2 className='text-lg font-semibold mb-4 text-gray-800'>
          Description
        </h2>
        <div className='mb-6'>
          {description && (
            <p className='text-sm text-gray-600 mb-3'>{description}</p>
          )}

          <h3 className='text-sm font-medium mb-3 text-gray-700'>
            Product Details:
          </h3>
          <ul
            className={`space-y-2 text-sm text-gray-600 ${
              isExpanded ? '' : 'max-h-[180px] overflow-hidden relative'
            }`}
          >
            {details.length > 0 ? (
              details.map((detail, index) => (
                <li key={index} className='flex items-start'>
                  <span className='mr-2 text-blue-500'>•</span>
                  <span>{detail}</span>
                </li>
              ))
            ) : (
              <>
                <li className='flex items-start'>
                  <span className='mr-2 text-blue-500'>•</span>
                  <span>No details available</span>
                </li>
              </>
            )}
            {!isExpanded && details.length > 5 && (
              <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent'></div>
            )}
          </ul>
          {details.length > 5 && (
            <button
              className='text-sm text-blue-600 hover:underline mt-3 font-medium flex items-center'
              onClick={toggleExpanded}
            >
              {isExpanded ? 'Show less' : 'View more'}
            </button>
          )}
        </div>

        <button className='w-full py-2.5 border border-gray-300 rounded-md text-sm mb-6 hover:bg-gray-50 transition-colors font-medium text-gray-700'>
          Refund Policy
        </button>
      </div>
    </section>
  );
}
