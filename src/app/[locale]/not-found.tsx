'use client';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <html lang='en'>
      <body className='flex flex-col h-screen justify-center items-center bg-gray-100'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className='flex flex-col items-center'>
          <h1 className='text-[120px] font-extrabold text-gray-700'>404</h1>
          <p className='text-2xl font-medium text-gray-600 mb-6'>
            Page Not Found
          </p>
          <a
            href='https://kaskod.dev/'
            className='px-4 py-2 font-medium text-white bg-clearBlue rounded-md hover:bg-lightBlue transition-all duration-200 ease-in-out'>
            Go to Kaskod.dev
          </a>
        </motion.div>
      </body>
    </html>
  );
}
