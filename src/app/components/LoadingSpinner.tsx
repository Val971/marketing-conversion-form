import React from 'react';
import Image from 'next/image';
import kaskod from '@/assets/logo_kaskod.png';
import { useTranslations } from 'next-intl';

export const LoadingSpinner = () => {
  const t = useTranslations('naviagtion');
  return (
    <div
      id='spinner'
      className='flex flex-col  gap-3 justify-center items-center h-full'>
      <Image
        className='kaskod w-20 animate-pulse'
        width={80}
        height={80}
        src={kaskod}
        alt='Kaskod white logo'
      />
      <p className='animate-pulse'>{t('wait')}</p>
    </div>
  );
};
