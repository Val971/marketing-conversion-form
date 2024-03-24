'use client';
import { startTransition, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useMultistepForm = () => {
  const [sptepsLength, setSptepsLength] = useState<number>(6);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const next = () => {
    if (currentStepIndex < sptepsLength) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  const back = (event: Event) => {
    event.preventDefault();
    if (currentStepIndex <= sptepsLength) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const setLanguage = (locale: string) => {
    startTransition(() => {
      router.replace(`/${locale === 'fr' ? 'en' : 'fr'}`);
    });
  };
  return {
    isFirstStep: currentStepIndex === 0,
    currentStepIndex,
    isLastStep: currentStepIndex === sptepsLength - 1,
    next,
    back,
    setLanguage,
    isLoading,
    setIsLoading,
    isSending,
    setIsSending,
  };
};
