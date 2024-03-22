import { IQuestions, QuestionType, ServiceType } from '@/app/utils/FormType';

export const clientInformationQuestions: IQuestions = {
  id: 0,
  question: 'Contact details',
  subTitle: 'Please fill your information so we can get in touch with you.',
  type: QuestionType.INPUT,
  options: [
    {
      id: 1,
      type: 'text',
      name: 'name',
      required: 'Your name is required',
      title: 'Name',
      placeholder: 'Enter your name',
    },
    {
      id: 2,
      type: 'email',
      name: 'email',
      required: 'Your email is required',
      title: 'Email',
      placeholder: 'Enter your email',
    },
    {
      id: 3,
      type: 'text',
      name: 'phoneNumber',
      title: 'Phone Number',
      placeholder: '(123) 456 - 7890',
    },
    {
      id: 4,
      type: 'text',
      name: 'companyName',
      title: 'Company',
      placeholder: 'Company name',
    },
  ],
};

export const servicesQuestions: IQuestions = {
  id: 0,
  question: 'Our services',
  subTitle: 'Please select which service you are interested in.',
  type: QuestionType.RADIO,
  options: [
    { id: 1, name: 'Option1', title: ServiceType.WEB_DEV },
    { id: 2, name: 'Option2', title: ServiceType.MOBILE_APP },
    { id: 3, name: 'Option3', title: ServiceType.WEB_DESIGN },
    { id: 4, name: 'Option4', title: ServiceType.MARKETING },
    { id: 5, name: 'Option5', title: ServiceType.OTHER },
  ],
};

export const budgetQuestions: IQuestions = {
  id: 0,
  question: 'What’s your project budget?',
  subTitle: 'Please select the project budget range you have in mind.',
  type: QuestionType.RADIO,
  options: [
    { id: 1, name: 'Option1', title: '$500 - $5.000' },
    { id: 2, name: 'Option2', title: '$5.000 - $10.000' },
    { id: 3, name: 'Option3', title: '$10.000 - $20.000' },
    { id: 4, name: 'Option4', title: '$20.000 +' },
  ],
};
export const timeQuestions: IQuestions = {
  id: 0,
  question: 'What is your expected completion time for this project?',
  subTitle: 'Please select your expected completion time you have in mind.',
  type: QuestionType.RADIO,
  options: [
    { id: 1, name: 'Option1', title: 'less than a month' },
    { id: 2, name: 'Option2', title: 'Between one and three months' },
    { id: 3, name: 'Option3', title: 'Between three and six months' },
    { id: 4, name: 'Option4', title: 'More than six months' },
  ],
};
export const featuresQuestions: IQuestions = {
  id: 3,
  question: 'What features do you want to include in your app?',
  subTitle: 'Check all options that apply.',
  type: QuestionType.CHECKBOX,
  options: [
    { id: 1, is_active: false, name: 'Option1', title: 'User authentication' },
    { id: 2, is_active: false, name: 'Option2', title: 'Content management' },
    { id: 3, is_active: false, name: 'Option3', title: 'Geolocation features' },
    {
      id: 4,
      is_active: false,
      name: 'Option4',
      title: 'Social media integration',
    },
    { id: 5, is_active: false, name: 'Option5', title: 'Online payments' },
    { id: 6, is_active: false, name: 'Option6', title: 'Instant messaging' },
    { id: 7, is_active: false, name: 'Option7', title: 'Push notifications' },
    { id: 8, is_active: false, name: 'Option8', title: 'Others' },
  ],
};
export const designQuestions: IQuestions = {
  id: 0,
  question:
    'Do you already have an idea of the design or functionality of your app?',
  subTitle: 'Check all options that apply.',
  type: QuestionType.RADIO,
  options: [
    {
      id: 1,
      name: 'Option1',
      title: 'Yes, I can provide mock-ups or detailed specifications.',
    },
    {
      id: 2,
      name: 'Option2',
      title: "No, I'm looking for advice and suggestions.",
    },
    { id: 3, name: 'Option3', title: "I haven't thought about this yet." },
  ],
};
