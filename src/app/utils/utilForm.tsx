import { FieldErrors } from 'react-hook-form';
import {
  FormAction,
  FormActionKind,
  FormDataProps,
} from '@/app/utils/FormType';
import React from 'react';

export class FormUtils {
  static generareError = (errors: FieldErrors, name: string) => {
    const template = (error: any) => (
      <p className='text-sm text-[#FF2D46] mb-5'>{`${error}`}</p>
    );
    switch (name) {
      case 'name':
        return template(errors.name ? errors.name.message : '');
      case 'email':
        return template(errors.email ? errors.email.message : '');
      case 'phoneNumber':
        return template(errors.phoneNumber ? errors.phoneNumber.message : '');
      case 'companyName':
        return template(errors.companyName ? errors.companyName.message : '');
      case 'serviceName':
        return template(errors.serviceName ? errors.serviceName.message : '');
      case 'budget':
        return template(errors.budget ? errors.budget.message : '');
      case 'features':
        return template(errors.features ? errors.features.message : '');
      case 'design':
        return template(errors.design ? errors.design.message : '');
    }
  };
  static reducer = (
    state: FormDataProps,
    action: FormAction
  ): FormDataProps => {
    if (!action) {
      return state;
    }
    switch (action.type) {
      case FormActionKind.fetch_client_information_data:
        return {
          ...state,
          clientInformation: action.payload,
        };
      case FormActionKind.services_data:
        return {
          ...state,
          service: action.payload,
        };
      case FormActionKind.budget:
        return {
          ...state,
          budget: action.payload,
        };
      case FormActionKind.design:
        return {
          ...state,
          design: action.payload,
        };
      case FormActionKind.time:
        return {
          ...state,
          time: action.payload,
        };
      case FormActionKind.failure:
        return { ...state };
      default:
        return state;
    }
  };
}
