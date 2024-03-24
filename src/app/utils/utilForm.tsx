import { FieldErrors } from 'react-hook-form';
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
}
