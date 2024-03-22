import { motion } from 'framer-motion';
import React from 'react';

export function NavigationSection({ ...props }) {
  return (
    <motion.div
      initial={{ x: '-100vw' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 80 }}
      className='flex justify-between my-10 gap-5'>
      {!props.isFirstStep && !props.isLastStep && (
        <button
          onClick={props.back}
          type='submit'
          className='inline-block w-full text-gray-600 rounded-xl border hover:text-[#4096ff] hover:border-[#4096ff] border-[#1677ff] px-5 py-3 font-medium sm:w-auto'>
          Back
        </button>
      )}
      {!props.isLastStep && (
        <div className='flex justify-end items-center w-full'>
          <button
            onClick={props.next}
            type='submit'
            className='inline-block w-full rounded-xl text-[#fff] hover:bg-[#4096ff] bg-[#1677ff] px-5 py-3 font-medium  sm:w-auto'>
            {`${props.currentStepIndex === 4 ? 'Submit' : 'Next'}`}
          </button>
        </div>
      )}
    </motion.div>
  );
}
