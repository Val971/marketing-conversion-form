'use client';
import React from 'react';
import kaskodLogo from '@/assets/KASKOD_white_logo.png';
import kaskodCIO from '@/assets/KASKOD_CIO.png';
import Image from 'next/image';
import { Separator } from '@/@/conponents/ui/separator';
import LocalSwitcher from '../LocalSwitcher';

export function LeftSideFormSection() {
  return (
    <div className='leftSideBg w-auto lg:w-[32%] p-8 h-full text-white'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col gap-14 mb-14'>
          <div className='flex justify-between'>
            <Image
              width={80}
              height={80}
              src={kaskodLogo}
              alt='Kaskod white logo'
            />
            <LocalSwitcher />
          </div>
          <div className='flex flex-col gap-8'>
            <h1 className='text-4xl font-bold'>
              Start your project with KASKOD!
            </h1>
            <p className='font-thin'>
              Tell us more about your business goals. We’ll get back to you
              within 1 working day.
            </p>
            <p className='font-normal'>
              Curious about what we can do for you? We are happy to tell you
              more!
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-3'>
            <div className='flex gap-5 items-center'>
              <Image
                className='rounded-full'
                width={60}
                height={60}
                src={kaskodCIO}
                alt='Kaskod CIO Valérie Novembre logo'
              />
              <div>
                <p className='font-bold text-lg'>Valérie Novembre</p>
                <p className='text-sm font-thin'>Developer</p>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <p className='text-sm font-thin'>valerie.novembre@gmx.fr</p>
              <p className='text-sm font-thin'>(123) 456 7890</p>
            </div>
          </div>
          <Separator className='bg-[#C3C2D4] my-5' />

          <p className='text-xs'>
            Have any other questions? Write to me via email{' '}
            <span className='text-[#3D46FB]'>valerie.novembre@gmx.fr</span>
          </p>
        </div>
      </div>
    </div>
  );
}
