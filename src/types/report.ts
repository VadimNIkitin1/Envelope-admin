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
  totalSalesForCategory: IReportItemForCategory[];
  totalSalesForProduct: IReportItemForCategory[];
  loading: boolean;
  error: string | null;
}

export interface IReportItemForCategory {
  id: number | string;
  product_name: string;
  category_name: string;
  total_sales: number;
}
