'use client';

import { Star } from 'lucide-react';

interface Review {
  id: string | number;
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
  ratingDistribution?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export default function ProductReviews({
  rating,
  reviewCount,
  reviews,
  ratingDistribution = {
    5: 78,
    4: 12,
    3: 5,
    2: 3,
    1: 2,
  },
}: ProductReviewsProps) {
  return (
    <section className='py-6 border-t px-4 bg-white mt-3'>
      <div className='max-w-3xl mx-auto'>
        <div className='flex justify-between items-center mb-5'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Ratings and reviews
          </h2>
        </div>

        <div className='flex flex-col md:flex-row bg-gray-50 p-4 rounded-lg mb-6'>
          <div className='md:w-1/3 mb-4 md:mb-0 md:pr-4 md:border-r border-gray-200'>
            <div className='text-4xl font-bold text-gray-800'>{rating}</div>
            <div className='flex mb-1'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className='text-sm text-gray-500'>
              Based on {reviewCount} reviews
            </div>
          </div>

          <div className='md:w-2/3 md:pl-6'>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className='flex items-center mb-2'>
                <div className='w-6 text-sm text-right mr-3 font-medium text-gray-600'>
                  {star}
                </div>
                <div className='flex-1 bg-gray-200 h-2.5 rounded-full overflow-hidden'>
                  <div
                    className='bg-yellow-400 h-full rounded-full'
                    style={{
                      width: `${
                        ratingDistribution[
                          star as keyof typeof ratingDistribution
                        ]
                      }%`,
                    }}
                  ></div>
                </div>
                <div className='w-8 text-xs text-right ml-2 text-gray-500'>
                  {ratingDistribution[star as keyof typeof ratingDistribution]}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-4 mb-6'>
          {reviews.map((review) => (
            <div
              key={review.id}
              className='p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow'
            >
              <div className='flex justify-between mb-2'>
                <div className='flex items-center'>
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className='ml-2 font-medium text-gray-800 text-sm'>
                    {review.name}
                  </span>
                </div>
                <div className='text-xs text-gray-500'>{review.date}</div>
              </div>
              <h3 className='text-sm font-semibold mb-1 text-gray-800'>
                {review.title}
              </h3>
              <p className='text-sm text-gray-600'>{review.comment}</p>
            </div>
          ))}
        </div>

        {reviewCount > reviews.length && (
          <button className='w-full py-3 border border-gray-300 rounded-md text-sm mb-6 hover:bg-gray-50 transition-colors font-medium text-gray-700'>
            Read more reviews
          </button>
        )}
      </div>
    </section>
  );
}
