'use client';
import React, { FormEvent, useEffect, useReducer } from 'react';
import * as yup from 'yup';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationSection } from '@/app/components/sections/NavigationSection';
import {
  clientInformationQuestions,
  servicesQuestions,
  budgetQuestions,
  designQuestions,
  timeQuestions,
} from '@/app/datas/questions';
import { FormUtils } from '@/app/utils/utilForm';
import {
  FormAction,
  FormActionKind,
  FormDataProps,
  IQuestions,
} from '@/app/utils/FormType';
import { validationSchema } from '@/app/utils/schema';
import { useMultistepForm } from '@/app/utils/useMultistepForm';
import { steps } from '@/app/datas/steps';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { HeaderQuestion } from '@/app/components/HeaderQuestion';
import { Steps } from 'antd';
import sendImg from '@/assets/send.png';

type Inputs = yup.InferType<typeof validationSchema>;
type FieldName = keyof Inputs;

const initialFormState = {};

export function FormSection() {
  const [state, dispatch] = useReducer<
    (state: FormDataProps, actions: FormAction) => FormDataProps
  >(FormUtils.reducer, initialFormState);
  const {
    back,
    next,
    isFirstStep,
    isLastStep,
    currentStepIndex,
    isLoading,
    setIsLoading,
  } = useMultistepForm();
  const {
    register,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });
  const fetchData = async (action: FormActionKind, data: IQuestions) => {
    try {
      dispatch({
        type: action,
        payload: data,
      });
    } catch (error: any) {
      dispatch({ type: FormActionKind.failure, error });
    }
  };

  const onSubmit = async () => {
    const formValues = getValues();
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        formValues: formValues,
      }),
    });
    if (response.status === 200) {
      next();
    }
  };
  const handleNext = async (event: FormEvent, callBack: any) => {
    event.preventDefault();
    const fields = steps[currentStepIndex].fields;
    const output = await trigger(fields as FieldName[]);
    if (output && currentStepIndex === 4) {
      return onSubmit();
    } else if (output) {
      return callBack();
    }
  };

  useEffect(() => {
    fetchData(
      FormActionKind.fetch_client_information_data,
      clientInformationQuestions
    )
      .then(() =>
        fetchData(FormActionKind.services_data, servicesQuestions).then(() =>
          fetchData(FormActionKind.budget, budgetQuestions).then(() =>
            fetchData(FormActionKind.design, designQuestions).then(() =>
              fetchData(FormActionKind.time, timeQuestions)
            )
          )
        )
      )
      .finally(() => setIsLoading(!isLoading));
  }, []);
  return (
    <>
      <div className='grid grid-cols-1 gap-x-16 lg:gap-y-8'>
        <Steps
          className='p-5 md:p-0'
          current={currentStepIndex}
          labelPlacement='vertical'
          items={steps}
        />
        <form onSubmit={handleSubmit(onSubmit)} className='p-5  lg:w-[58rem]'>
          <AnimatePresence mode='wait'>
            {clientInformationQuestions && currentStepIndex === 0 && (
              <motion.div
                key={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                <HeaderQuestion
                  question={clientInformationQuestions.question}
                  subTitle={clientInformationQuestions.subTitle}
                />

                <div className='grid grid-cols-2 gap-x-5 '>
                  {state.clientInformation &&
                    state.clientInformation.options &&
                    state.clientInformation.options.map((option) => {
                      return (
                        <div key={option.id} className='flex flex-col gap-2'>
                          <span className='label-text  text-[#043474] font-semibold'>
                            {option.title}
                          </span>
                          <div className='border rounded-xl border-[#d1d5db]'>
                            <label
                              className='sr-only border rounded-lg'
                              htmlFor='name'>
                              {option.title}
                            </label>
                            <input
                              {...register(`${option.name}` as any)}
                              className='w-full border rounded-xl  p-3 text-sm'
                              placeholder={option.placeholder}
                              type={option.type}
                              id='name'
                            />
                          </div>
                          {FormUtils.generareError(errors, option.name!)}
                        </div>
                      );
                    })}
                </div>
              </motion.div>
            )}
            {servicesQuestions && currentStepIndex === 1 && (
              <motion.div
                key={2}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                <HeaderQuestion
                  question={servicesQuestions.question}
                  subTitle={servicesQuestions.subTitle}
                />
                <p className='text-sm text-red-600 mb-5'>
                  {FormUtils.generareError(errors, 'serviceName')}
                </p>
                <div className='flex flex-col md:grid md:grid-cols-2 gap-5'>
                  {state.service &&
                    state.service.options &&
                    state.service.options.map((option) => {
                      return (
                        <div key={option.id}>
                          <label
                            htmlFor={option.name}
                            className='block w-full cursor-pointer rounded-xl border border-[#d1d5db] p-3 text-gray-600 hover:border-[#4096ff] hover:text-[#4096ff] has-[:checked]:border-[#4065ED] has-[:checked]:bg-[#4065ED] has-[:checked]:text-[#fff]'>
                            <input
                              className='sr-only border rounded-lg'
                              id={option.name}
                              type='radio'
                              value={option.title}
                              {...register('serviceName')}
                            />
                            <span className='text-sm'>{option.title}</span>
                          </label>
                        </div>
                      );
                    })}
                </div>
              </motion.div>
            )}
            {budgetQuestions && currentStepIndex === 2 && (
              <motion.div
                key={3}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                <HeaderQuestion
                  question={budgetQuestions.question}
                  subTitle={budgetQuestions.subTitle}
                />
                <p className='text-sm text-red-600 mb-5'>
                  {FormUtils.generareError(errors, 'budget')}
                </p>
                <div className='flex flex-col md:grid md:grid-cols-2 gap-5'>
                  {state.budget &&
                    state.budget.options &&
                    state.budget.options.map((option) => {
                      return (
                        <div key={option.id}>
                          <label
                            htmlFor={option.name}
                            className='block w-full cursor-pointer border rounded-xl border-[#d1d5db] p-3 text-gray-600 hover:border-[#4096ff] hover:text-[#4096ff] has-[:checked]:border-[#4065ED] has-[:checked]:bg-[#4065ED] has-[:checked]:text-[#fff]'>
                            <input
                              className='sr-only border rounded-lg'
                              id={option.name}
                              type='radio'
                              value={option.title}
                              {...register('budget')}
                            />
                            <span className='text-sm '>{option.title}</span>
                          </label>
                        </div>
                      );
                    })}
                </div>
              </motion.div>
            )}
            {timeQuestions && currentStepIndex === 3 && (
              <motion.div
                key={4}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                <HeaderQuestion
                  question={timeQuestions.question}
                  subTitle={timeQuestions.subTitle}
                />
                <p className='text-sm text-red-600 mb-5'>
                  {FormUtils.generareError(errors, 'time')}
                </p>
                <div className='flex flex-col md:grid md:grid-cols-2 gap-5'>
                  {state.time &&
                    state.time.options &&
                    state.time.options.map((option) => {
                      return (
                        <div key={option.id}>
                          <label
                            htmlFor={option.name}
                            className='block w-full cursor-pointer rounded-xl border border-[#d1d5db] p-3 text-gray-600 hover:text-[#4096ff] hover:border-[#4096ff] has-[:checked]:border-[#4065ED] has-[:checked]:bg-[#4065ED] has-[:checked]:text-[#fff]'>
                            <input
                              className='sr-only border rounded-lg'
                              id={option.name}
                              type='radio'
                              value={option.title}
                              {...register('time')}
                            />
                            <span className='text-sm'>{option.title}</span>
                          </label>
                        </div>
                      );
                    })}
                </div>
              </motion.div>
            )}
            {designQuestions && currentStepIndex === 4 && (
              <motion.div
                key={6}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                <HeaderQuestion
                  question={designQuestions.question}
                  subTitle={designQuestions.subTitle}
                />
                <p className='text-sm text-[#FF2D46] mb-5'>
                  {FormUtils.generareError(errors, 'design')}
                </p>
                <div className='flex flex-col md:grid md:grid-cols-2 gap-5'>
                  {state.design &&
                    state.design.options &&
                    state.design.options.map((option) => {
                      return (
                        <div key={option.id}>
                          <label
                            htmlFor={option.name}
                            className='block w-full cursor-pointer rounded-xl border border-[#d1d5db] p-3 text-gray-600 hover:text-[#4096ff] hover:border-[#4096ff] has-[:checked]:border-[#4065ED] has-[:checked]:bg-[#4065ED] has-[:checked]:text-[#fff]'>
                            <input
                              className='sr-only border rounded-lg'
                              id={option.name}
                              type='radio'
                              value={option.title}
                              {...register('design')}
                            />
                            <span className='text-sm'>{option.title}</span>
                          </label>
                        </div>
                      );
                    })}
                </div>
              </motion.div>
            )}
            {currentStepIndex === 5 && (
              <div className='text-center justify-center items-center flex flex-col gap-3 px-auto md:px-14 mb-5'>
                <Image
                  className='my-5'
                  src={sendImg}
                  alt='check icon'
                  height={200}
                  width={200}
                />
                <p className='text-[#170F49] font-bold text-xl  mb-2'>
                  Thank you for submitting!
                </p>
                <p className='text-[#6F6C90] text-base py-3'>
                  {
                    " Thank you for completing the form! Your input is greatly appreciated. We'll be in touch with you shortly."
                  }
                </p>
                <a
                  href='https://kaskod.dev/'
                  type='submit'
                  className='inline-block w-full text-[#fff] hover:bg-[#4096ff] rounded-xl bg-[#1677ff] px-5 py-3 font-medium text-white sm:w-auto'>
                  Retour au site
                </a>
              </div>
            )}
          </AnimatePresence>
          <NavigationSection
            back={back}
            currentStepIndex={currentStepIndex}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            next={(event: FormEvent) => handleNext(event, next)}
          />
        </form>
      </div>
    </>
  );
}
