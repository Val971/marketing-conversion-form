import { QuestionType } from '@/app/utils/FormType';

export const clientInformationQuestions = (t: any) => {
  return {
    id: 0,
    question: t('question1.title'),
    subTitle: t('question1.subTitle'),
    type: QuestionType.INPUT,
    options: [
      {
        id: 1,
        type: 'text',
        name: 'name',
        required: t('question1.option1.required'),
        title: t('question1.option1.title'),
        placeholder: t('question1.option1.placeholder'),
      },
      {
        id: 2,
        type: 'email',
        name: 'email',
        required: t('question1.option2.required'),
        title: t('question1.option2.title'),
        placeholder: t('question1.option2.placeholder'),
      },
      {
        id: 3,
        type: 'text',
        name: 'phoneNumber',
        title: t('question1.option3.title'),
        placeholder: t('question1.option3.placeholder'),
      },
      {
        id: 4,
        type: 'text',
        name: 'companyName',
        title: t('question1.option4.title'),
        placeholder: t('question1.option4.placeholder'),
      },
    ],
  };
};

export const servicesQuestions = (t: any) => {
  return {
    id: 0,
    question: t('question2.title'),
    subTitle: t('question2.subTitle'),
    type: QuestionType.RADIO,
    options: [
      { id: 1, name: 'Option1', title: t('question2.option1Title') },
      { id: 2, name: 'Option2', title: t('question2.option2Title') },
      { id: 3, name: 'Option3', title: t('question2.option3Title') },
      { id: 4, name: 'Option4', title: t('question2.option4Title') },
      { id: 5, name: 'Option5', title: t('question2.option5Title') },
    ],
  };
};

export const budgetQuestions = (t: any) => {
  return {
    id: 0,
    question: t('question3.title'),
    subTitle: t('question3.subTitle'),
    type: QuestionType.RADIO,
    options: [
      { id: 1, name: 'Option1', title: '$500 - $5.000' },
      { id: 2, name: 'Option2', title: '$5.000 - $10.000' },
      { id: 3, name: 'Option3', title: '$10.000 - $20.000' },
      { id: 4, name: 'Option4', title: '$20.000 +' },
    ],
  };
};
export const timeQuestions = (t: any) => {
  return {
    id: 0,
    question: t('question4.title'),
    subTitle: t('question4.subTitle'),
    type: QuestionType.RADIO,
    options: [
      { id: 1, name: 'Option1', title: t('question4.option1Title') },
      { id: 2, name: 'Option2', title: t('question4.option2Title') },
      { id: 3, name: 'Option3', title: t('question4.option3Title') },
      { id: 4, name: 'Option4', title: t('question4.option4Title') },
    ],
  };
};
export const featuresQuestions = (t: any) => {
  return {
    id: 3,
    question: 'What features do you want to include in your app?',
    subTitle: 'Check all options that apply.',
    type: QuestionType.CHECKBOX,
    options: [
      {
        id: 1,
        is_active: false,
        name: 'Option1',
        title: 'User authentication',
      },
      { id: 2, is_active: false, name: 'Option2', title: 'Content management' },
      {
        id: 3,
        is_active: false,
        name: 'Option3',
        title: 'Geolocation features',
      },
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
};
export const designQuestions = (t: any) => {
  return {
    id: 0,
    question: t('question5.title'),
    subTitle: t('question5.subTitle'),
    type: QuestionType.RADIO,
    options: [
      {
        id: 1,
        name: 'Option1',
        title: t('question5.option1Title'),
      },
      {
        id: 2,
        name: 'Option2',
        title: t('question5.option2Title'),
      },
      { id: 3, name: 'Option3', title: t('question5.option3Title') },
    ],
  };
};
