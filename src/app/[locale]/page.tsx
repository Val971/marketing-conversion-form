import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <p className=' text-red-600'>{t('title')}</p>
    </main>
  );
}
