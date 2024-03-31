'use client';
import { RightSideFormSection } from '@/app/components/sections/RightSideFormSection';
import { LeftSideFormSection } from '@/app/components/sections/LeftSideFormSection';

export default function Home() {
  return (
    <main className='h-[100%] md:h-[100vh] justify-center flex flex-col lg:flex-row'>
      <>
        {' '}
        <LeftSideFormSection />
        <RightSideFormSection />
      </>
    </main>
  );
}
