'use client';
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

import React, { startTransition } from 'react';
import { useParams } from 'next/navigation';
import { locales, pathnames } from '@/middleware';

export default function LocalSwitcher() {
  const { usePathname, useRouter } = createLocalizedPathnamesNavigation({
    locales,
    pathnames,
  });
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const onSelectChange = (lang: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: lang }
      );
    });
  };
  return (
    <button
      onClick={() => onSelectChange(params.locale === 'fr' ? 'en' : 'fr')}
      className='border-2 border-white rounded-full p-3 h-12 cursor-pointer'>
      {`${params.locale === 'fr' ? 'EN' : 'FR'}`}
    </button>
  );
}
