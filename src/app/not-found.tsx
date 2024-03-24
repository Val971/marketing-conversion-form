'use client';

import Error from 'next/error';

export default function NotFound() {
  return (
    <html lang='en'>
      <body className='flex flex-col h-screen justify-center items-center bg-gray-100'>
        <div className='flex flex-col items-center'>
          <h1 className='text-[120px] font-extrabold text-gray-700'>404</h1>
          <p className='text-2xl font-medium text-gray-600 mb-6'>
            Page Not Found
          </p>
          <a
            href='https://kaskod.dev/'
            className='px-4 py-2 font-medium text-white bg-clearBlue rounded-md hover:bg-lightBlue transition-all duration-200 ease-in-out'>
            Go to Kaskod.dev
          </a>
        </div>
      </body>
    </html>
  );
}
