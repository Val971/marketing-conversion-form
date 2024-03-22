import { useTranslations } from 'next-intl';
import { RightSideFormSection } from '@/app/components/sections/RightSideFormSection';
import { LeftSideFormSection } from '@/app/components/sections/LeftSideFormSection';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <main className='h-[100%] md:h-[100vh] flex flex-col lg:flex-row'>
      <LeftSideFormSection />
      {/* <RightSideFormSection /> */}
    </main>
  );
}
