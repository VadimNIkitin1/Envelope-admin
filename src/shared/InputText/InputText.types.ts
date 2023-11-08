import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface IProps {
  placeholder: string;
  view: string;
  error: FieldError | undefined;
}

export type IInputProps = InputHTMLAttributes<HTMLInputElement> & IProps;
