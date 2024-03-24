export enum QuestionType {
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  INPUT = 'input',
  TEXTAREA = 'textarea',
}

export enum FormActionKind {
  services_data = 'FETCH_SERVICES_DATA',
  budget = 'FETCH_BUDGET_DATA',
  feature = 'FETCH_FEATURES_DATA',
  sucess = 'FETCH_DATA_SUCESS',
  design = 'FETCH_DESIGN_DATA',
  time = 'FETCH_TIMEs_DATA',
  failure = 'FETCH_DATA_FAILURE',
  fetch_client_information_data = 'FETCH_CLIENT_INFORMATION_DATA',
}

export interface FormAction {
  type?: FormActionKind;
  payload?: IQuestions;
  error?: string;
}
export type IFeature = {
  id: number;
  title: string;
};

export type FormDataProps = {
  clientInformation?: IQuestions;
  service?: IQuestions;
  budget?: IQuestions;
  design?: IQuestions;
  time?: IQuestions;
  loading?: boolean;
  error?: string;
};
export interface IQuestionOptions {
  id: number;
  title: string;
  placeholder?: string;
  required?: string;
  ico?: any;
  name?: string;
  type?: string;
  is_active?: boolean;
}
export interface IQuestions {
  id: number;
  question: string;
  subTitle: string;
  type: QuestionType;
  options?: IQuestionOptions[];
  answer?: string[];
}
export type FormDataState = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  companyName?: string;
  serviceName?: string;
  budget?: string;
  features?: IFeature[];
  design?: string;
  time?: string;
};
