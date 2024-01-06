import { AxiosError } from 'axios';

export interface IAuth {
  data: {
    username: string;
    user_id: number;
  };
  loading: boolean;
  error: AxiosError | null | string;
}
