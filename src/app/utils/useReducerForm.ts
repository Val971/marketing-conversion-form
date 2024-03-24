'use client';
import { useReducer } from 'react';
import {
  FormAction,
  FormActionKind,
  FormDataProps,
  IQuestions,
} from '@/app/utils/FormType';

export const useReducerForm = () => {
  const [state, dispatch] = useReducer<
    (state: FormDataProps, actions: FormAction) => FormDataProps
  >(reducer, {});

  const dispatchData = async (action: FormActionKind, data: IQuestions) => {
    try {
      dispatch({
        type: action,
        payload: data,
      });
    } catch (error: any) {
      dispatch({ type: FormActionKind.failure, error });
    }
  };

  return {
    dispatchData,
    state,
  };
};
const reducer = (state: FormDataProps, action: FormAction): FormDataProps => {
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
