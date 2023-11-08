import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface IProps {
  placeholder: string;
  error?: FieldError;
}

export type IInputProps = InputHTMLAttributes<HTMLInputElement> & IProps;
