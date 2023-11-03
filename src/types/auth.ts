import { IError } from './categories';

export interface IAuth {
  data: {
    username: string;
    user_id: number;
  };
  loading: boolean;
  error: IError | null;
}
