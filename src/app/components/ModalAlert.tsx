import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/@/conponents/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function ModalAlert({ ...props }) {
  const t = useTranslations('Confirmation');
  return (
    <AlertDialog open={props.openDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className='flex text-red-600 items-center gap-5'>
            <AlertCircle className='h-4 w-4' />
            <AlertDialogTitle>Error!</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            <p>{t('paragraph1')}</p>
            <p>{t('paragraph2')}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='flex justify-center'>
          <a
            href='https://kaskod.dev/'
            type='submit'
            className='inline-block w-full hover:bg-lightBlue rounded-xl bg-clearBlue px-5 py-3 font-medium text-white sm:w-auto'>
            {t('backbtn')}
          </a>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
