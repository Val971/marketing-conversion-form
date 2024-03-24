import { Button } from '@/@/conponents/ui/button';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export function NavigationSection({ ...props }) {
  const t = useTranslations('naviagtion');
  return (
    <motion.div
      viewport={{ once: true }}
      initial={{ x: '-30vw' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 80 }}
      className='flex justify-between my-10 gap-5'>
      {!props.isFirstStep && !props.isLastStep && (
        <Button
          disabled={props.isSending}
          variant='outline'
          onClick={props.back}
          className='inline-block w-full text-gray-600 rounded-xl border hover:text-lightBlue hover:border-lightBlue border-clearBlue px-10 font-medium sm:w-auto'>
          {t('back')}
        </Button>
      )}
      {!props.isLastStep && (
        <div className='flex justify-end items-center w-full'>
          <Button
            disabled={props.isSending}
            onClick={props.next}
            type='submit'
            className='inline-block w-full rounded-xl text-white hover:bg-lightBlue bg-clearBlue px-10 font-medium  sm:w-auto'>
            {props.isSending ? (
              <div className='flex gap-5 justify-center items-center'>
                {' '}
                <span>{t('wait')}</span>{' '}
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              </div>
            ) : (
              `${props.currentStepIndex === 4 ? t('submit') : t('next')}`
            )}
          </Button>
        </div>
      )}
    </motion.div>
  );
}
