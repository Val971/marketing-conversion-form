'use client';
import { RightSideFormSection } from '@/app/components/sections/RightSideFormSection';
import { LeftSideFormSection } from '@/app/components/sections/LeftSideFormSection';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <main className='h-[100%] md:h-[100vh] justify-center flex flex-col lg:flex-row'>
      {loading ? (
        <div className='flex items-center justify-center h-screen'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {' '}
          <LeftSideFormSection />
          <RightSideFormSection />
        </>
      )}
    </main>
  );
}
