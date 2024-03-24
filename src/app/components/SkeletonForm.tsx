import { Skeleton } from '@/@/conponents/ui/skeleton';
import React from 'react';

export function SkeletonForm({ ...props }) {
  return (
    <div className='flex flex-col space-y-3'>
      {props.thin ? (
        <>
          <div className='space-y-2'>
            <Skeleton className='h-10 bg-[#F9F9FA]' />
            <Skeleton className='h-4 bg-[#F9F9FA]' />
          </div>
        </>
      ) : (
        <>
          {' '}
          <Skeleton className=' bg-[#F9F9FA] h-[200px] rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-10 bg-[#F9F9FA]' />
            <Skeleton className='h-4 bg-[#F9F9FA]' />
            <Skeleton className='h-10 bg-[#F9F9FA]' />
            <Skeleton className='h-4 bg-[#F9F9FA]' />
          </div>
        </>
      )}
    </div>
  );
}
