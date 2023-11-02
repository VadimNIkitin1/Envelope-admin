import { IError } from './categories';

export interface IAuth {
  isAuth: boolean;
  company_id: number | null;
  loading: boolean;
  error: IError | null;
}
