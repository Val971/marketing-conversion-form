import React from 'react';
import { Steps } from 'antd';
import { useTranslations } from 'next-intl';
export const steps = (t: any) => [
  {
    id: 0,
    title: `${t('informations')}`,
    fields: ['name', 'email'],
  },
  {
    id: 1,
    title: t('Services'),
    fields: ['serviceName'],
  },
  { id: 2, title: t('budget'), fields: ['budget'] },
  { id: 3, title: `${t('time')}`, fields: ['time'] },
  { id: 4, title: t('design'), fields: ['design'] },
  { id: 5, title: t('submit'), fields: [] },
];
export function Stepper({ ...props }) {
  const t = useTranslations('rigthSection.steps.');

  return <Steps current={props.currentStepIndex} items={steps(t)} />;
}
