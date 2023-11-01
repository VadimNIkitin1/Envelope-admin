import { IError } from './categories';

export interface IAuth {
  isAuth: boolean;
  company_id: string;
  loading: boolean;
  error: IError | null;
}
