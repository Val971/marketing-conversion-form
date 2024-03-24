import React from 'react';

export function HeaderQuestion({ ...props }) {
  return (
    <div className='flex flex-col my-10'>
      <h2 className=' text-mediumBlue font-semibold text-2xl'>
        {props.question}
      </h2>
      <p className='text-lightgray'>{props.subTitle}</p>
    </div>
  );
}
