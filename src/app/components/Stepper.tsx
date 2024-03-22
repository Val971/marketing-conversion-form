import React from 'react';
import { Steps } from 'antd';
import { steps } from '@/app/datas/steps';

export function Stepper({ ...props }) {
  return <Steps current={props.currentStepIndex} items={steps} />;
}
