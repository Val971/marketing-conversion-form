import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().max(32).required(),
  email: yup.string().email().required(),
  serviceName: yup.string().required('Select a service is required'),
  budget: yup.string().required('Select a budget is required'),
  time: yup.string().required('Select a time is required'),
  design: yup.string().required('Select a design is required'),
});
