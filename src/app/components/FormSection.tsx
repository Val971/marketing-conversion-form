'use client';
import React, { FormEvent, useEffect, useReducer, useState } from 'react';
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
import {
  FormAction,
  FormActionKind,
  FormDataProps,
  IQuestions,
} from '@/app/utils/FormType';
import { useTranslations } from 'next-intl';
import { useMultistepForm } from '@/app/utils/useMultistepForm';
import { steps } from '@/app/datas/steps';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { HeaderQuestion } from '@/app/components/HeaderQuestion';
import { Steps } from 'antd';
import { SkeletonForm } from '@/app/components/SkeletonForm';
import { AlertCircle, CircleCheckBig } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/@/conponents/ui/alert-dialog';

const initialFormState = {};

export function FormSection() {
  const localTranslation = useTranslations('rigthSection.form');
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
  const [openDialog, setOpenDialogtrue] = useState(false);
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
      clientInformationQuestions(localTranslation)
    )
      .then(() =>
        fetchData(
          FormActionKind.services_data,
          servicesQuestions(localTranslation)
        ).then(() =>
          fetchData(
            FormActionKind.budget,
            budgetQuestions(localTranslation)
          ).then(() =>
            fetchData(
              FormActionKind.design,
              designQuestions(localTranslation)
            ).then(() =>
              fetchData(FormActionKind.time, timeQuestions(localTranslation))
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
              items={steps}
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
      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className='flex text-red-600 items-center gap-5'>
              <AlertCircle className='h-4 w-4' />
              <AlertDialogTitle>Error!</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              {
                "Une erreur s'est produite lors de la transmission de la requête."
              }
              {
                'Veuillez vérifier votre connexion Internet et réessayer ultérieurement.'
              }
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
      {isSending && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <svg
            aria-hidden='true'
            className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
        </div>
      )}
    </>
  );
}
