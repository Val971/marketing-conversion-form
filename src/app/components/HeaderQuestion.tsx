import React from 'react';

export function HeaderQuestion({ ...props }) {
  return (
    <div className='flex flex-col my-10'>
      <h2 className='text-[#043474] font-semibold text-2xl'>
        {props.question}
      </h2>
      <p className='text-[#8CA2BF]'>{props.subTitle}</p>
    </div>
  );
}
