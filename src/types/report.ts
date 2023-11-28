export interface ICustomers {
  id: number;
  tg_user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  is_premium: boolean;
}

export interface IReportInitialState {
  customers: ICustomers[];
  loading: boolean;
  error: string | null;
}
