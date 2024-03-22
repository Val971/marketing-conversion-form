'use client';
import React from 'react';
import { useMultistepForm } from '@/app/utils/useMultistepForm';
import { usePathname } from 'next/navigation';

export default function LocalSwitcher() {
  const locale = usePathname()?.split('/')[1];
  const { setLanguage } = useMultistepForm();
  return (
    <button
      onClick={() => setLanguage(locale)}
      className='border-2 border-white rounded-full p-3 h-12 cursor-pointer'>
      {`${locale === 'fr' ? 'EN' : 'FR'}`}
    </button>
  );
}
