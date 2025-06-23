import React from 'react';

const PageLoading: React.FC = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
    </div>
  );
};

export default PageLoading;
