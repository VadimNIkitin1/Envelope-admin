import { IError } from './categories';

export interface IAuth {
  isAuth: boolean;
  data: {
    username: string;
    user_id: number;
  };
  loading: boolean;
  error: IError | null;
}
