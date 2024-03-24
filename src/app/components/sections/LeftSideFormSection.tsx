'use client';
import React from 'react';
import kaskodLogo from '@/assets/KASKOD_white_logo.png';
import kaskodCIO from '@/assets/KASKOD_CIO.png';
import Image from 'next/image';
import { Separator } from '@/@/conponents/ui/separator';
import LocalSwitcher from '../LocalSwitcher';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function LeftSideFormSection() {
  const t = useTranslations('leftSection');
  return (
    <div className='leftSideBg w-auto lg:w-[32%] p-8 min-h-[47rem] text-white'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col gap-14 mb-14'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className='flex justify-between'>
            <a href='https://kaskod.dev/'>
              <Image
                width={80}
                height={80}
                src={kaskodLogo}
                alt='Kaskod white logo'
              />
            </a>

            <LocalSwitcher />
          </motion.div>
          <div className='flex flex-col gap-8'>
            <motion.h1
              viewport={{ once: true }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className='text-2xl lg:text-4xl font-bold'
              dangerouslySetInnerHTML={{ __html: t('title') }}
            />

            <motion.p
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className='font-thin'
              dangerouslySetInnerHTML={{ __html: t('paragraph1') }}
            />
            <motion.p
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className='font-normal'
              dangerouslySetInnerHTML={{ __html: t('paragraph2') }}
            />
          </div>
        </div>
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className='flex flex-col gap-2'>
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
            {t('paragraphEnd')}{' '}
            <span className='text-[#3D46FB]'>valerie.novembre@gmx.fr</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
