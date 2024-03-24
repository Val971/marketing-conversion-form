'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import * as yup from 'yup';
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
import { FormActionKind } from '@/app/utils/FormType';
import { useTranslations } from 'next-intl';
import { useMultistepForm } from '@/app/utils/useMultistepForm';
import { steps } from '@/app/datas/steps';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { HeaderQuestion } from '@/app/components/HeaderQuestion';
import { Steps } from 'antd';
import { SkeletonForm } from '@/app/components/SkeletonForm';
import { CircleCheckBig } from 'lucide-react';

import { useReducerForm } from '@/app/utils/useReducerForm';
import ModalAlert from '@/app/components/ModalAlert';
import SpinnerScreen from '@/app/components/spinnerScreen';

export function FormSection() {
  const [openDialog, setOpenDialogtrue] = useState(false);
  const localTranslation = useTranslations('rigthSection.form');
  const stepsTranslation = useTranslations('rigthSection.steps');
  const t = useTranslations('Confirmation');
  const validation = yup.object().shape({
    name: yup
      .string()
      .max(32)
      .required(localTranslation('question1.option1.required')),
    email: yup
      .string()
      .email()
      .required(localTranslation('question1.option2.required')),
    serviceName: yup.string().required(localTranslation('question2.required')),
    budget: yup.string().required(localTranslation('question3.required')),
    time: yup.string().required(localTranslation('question4.required')),
    design: yup.string().required(localTranslation('question5.required')),
  });
  type Inputs = yup.InferType<typeof validation>;
  type FieldName = keyof Inputs;
  const { dispatchData, state } = useReducerForm();
  const {
    back,
    next,
    isFirstStep,
    isLastStep,
    currentStepIndex,
    isLoading,
    setIsLoading,
    setIsSending,
    isSending,
  } = useMultistepForm();
  const {
    register,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validation),
  });
  const onSubmit = async () => {
    setIsSending(true);
    const formValues = getValues();
    await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        formValues: formValues,
      }),
    }).then((response) => {
      if (response.status === 200) {
        next();
        setIsSending(false);
      } else {
        setTimeout(() => {
          setOpenDialogtrue(true);
        }, 3000);
      }
    });
  };
  const handleNext = async (event: FormEvent, callBack: any) => {
    event.preventDefault();
    const fields = steps(stepsTranslation)[currentStepIndex].fields;
    const output = await trigger(fields as FieldName[]);
    if (output && currentStepIndex === 4) {
      return onSubmit();
    } else if (output) {
      return callBack();
    }
  };

  useEffect(() => {
    dispatchData(
      FormActionKind.fetch_client_information_data,
      clientInformationQuestions(localTranslation)
    )
      .then(() =>
        dispatchData(
          FormActionKind.services_data,
          servicesQuestions(localTranslation)
        ).then(() =>
          dispatchData(
            FormActionKind.budget,
            budgetQuestions(localTranslation)
          ).then(() =>
            dispatchData(
              FormActionKind.design,
              designQuestions(localTranslation)
            ).then(() =>
              dispatchData(FormActionKind.time, timeQuestions(localTranslation))
            )
          )
        )
      )
      .finally(() => setIsLoading(!isLoading));
  }, []);
  return (
    <>
      <div className='grid grid-cols-1 gap-x-16 lg:gap-y-8'>
        {isLoading ? (
          <SkeletonForm />
        ) : (
          <>
            <Steps
              className='p-5 md:p-0'
              current={currentStepIndex}
              labelPlacement='vertical'
              items={steps(stepsTranslation)}
            />
            <form onSubmit={handleSubmit(onSubmit)} className='p-5'>
              <AnimatePresence mode='wait'>
                {currentStepIndex === 0 && (
                  <motion.div
                    key={1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <HeaderQuestion
                      question={state.clientInformation?.question}
                      subTitle={state.clientInformation?.subTitle}
                    />

                    <div className='grid grid-cols-2 gap-x-5 '>
                      {state.clientInformation &&
                        state.clientInformation.options &&
                        state.clientInformation.options.map((option) => {
                          return (
                            <div
                              key={option.id}
                              className='flex flex-col gap-2'>
                              <span className='label-text  text-mediumBlue font-semibold'>
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
                {currentStepIndex === 1 && (
                  <motion.div
                    key={2}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <HeaderQuestion
                      question={state.service?.question}
                      subTitle={state.service?.subTitle}
                    />
                    <span className='text-sm text-red-600 mb-5'>
                      {FormUtils.generareError(errors, 'serviceName')}
                    </span>
                    <div className='flex flex-col md:grid md:grid-cols-2 gap-5'>
                      {state.service &&
                        state.service.options &&
                        state.service.options.map((option) => {
                          return (
                            <div key={option.id}>
                              <label
                                htmlFor={option.name}
                                className='block w-full cursor-pointer rounded-xl border border-[#d1d5db] p-3 text-gray-600 hover:border-lightBlue hover:text-lightBlue has-[:checked]:border-clearBlue has-[:checked]:bg-clearBlue has-[:checked]:text-white'>
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
                {currentStepIndex === 2 && (
                  <motion.div
                    key={3}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <HeaderQuestion
                      question={state.budget?.question}
                      subTitle={state.budget?.subTitle}
                    />
                    <span className='text-sm text-red-600 mb-5'>
                      {FormUtils.generareError(errors, 'budget')}
                    </span>
                    <div className='flex flex-col md:grid md:grid-cols-2 gap-5'>
                      {state.budget &&
                        state.budget.options &&
                        state.budget.options.map((option) => {
                          return (
                            <div key={option.id}>
                              <label
                                htmlFor={option.name}
                                className='block w-full cursor-pointer border rounded-xl border-[#d1d5db] p-3 text-gray-600 hover:border-lightBlue hover:text-lightBlue has-[:checked]:border-clearBlue has-[:checked]:bg-clearBlue has-[:checked]:text-white'>
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
                {currentStepIndex === 3 && (
                  <motion.div
                    key={4}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <HeaderQuestion
                      question={state.time?.question}
                      subTitle={state.time?.subTitle}
                    />
                    <span className='text-sm text-red-600 mb-5'>
                      {FormUtils.generareError(errors, 'time')}
                    </span>
                    <div className='flex flex-col md:grid md:grid-cols-2 gap-5'>
                      {state.time &&
                        state.time.options &&
                        state.time.options.map((option) => {
                          return (
                            <div key={option.id}>
                              <label
                                htmlFor={option.name}
                                className='block w-full cursor-pointer rounded-xl border border-[#d1d5db] p-3 text-gray-600 hover:text-lightBlue hover:border-lightBlue has-[:checked]:border-clearBlue has-[:checked]:bg-clearBlue has-[:checked]:text-white'>
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
                {currentStepIndex === 4 && (
                  <motion.div
                    key={6}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <HeaderQuestion
                      question={state.design?.question}
                      subTitle={state.design?.subTitle}
                    />
                    <span className='text-sm text-[#FF2D46] mb-5'>
                      {FormUtils.generareError(errors, 'design')}
                    </span>
                    <div className='flex flex-col md:grid md:grid-cols-2 gap-5'>
                      {state.design &&
                        state.design.options &&
                        state.design.options.map((option) => {
                          return (
                            <div key={option.id}>
                              <label
                                htmlFor={option.name}
                                className='block w-full cursor-pointer rounded-xl border border-[#d1d5db] p-3 text-gray-600 hover:text-lightBlue hover:border-lightBlue has-[:checked]:border-clearBlue has-[:checked]:bg-clearBlue has-[:checked]:text-white'>
                                <input
                                  disabled={isSending}
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
                  <div className='text-center justify-center items-center flex flex-col py-10 md:py-20 gap-5 px-auto md:px-14 mb-5'>
                    <CircleCheckBig color='#1677ff' width={100} height={100} />
                    <span className='text-darkBlue font-bold text-xl  mb-2'>
                      {t('title')}
                    </span>
                    <p className='text-[#6F6C90] text-base py-3'>{t('text')}</p>
                    <a
                      href='https://kaskod.dev/'
                      type='submit'
                      className='inline-block w-full hover:bg-lightBlue rounded-xl bg-clearBlue px-5 py-3 font-medium text-white sm:w-auto'>
                      {t('backbtn')}
                    </a>
                  </div>
                )}
              </AnimatePresence>
              <NavigationSection
                back={back}
                isSending={isSending}
                currentStepIndex={currentStepIndex}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                next={(event: FormEvent) => handleNext(event, next)}
              />
            </form>
          </>
        )}
      </div>
      <ModalAlert openDialog={openDialog} />
      {isSending && <SpinnerScreen />}
    </>
  );
}
