export interface ICustomers {
  id: number;
  tg_user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  is_premium: boolean;
}

export interface ITotalSales {
  total_sales: number;
}

export interface IReportInitialState {
  customers: ICustomers[];
  totalSales: ITotalSales;
  totalSalesForCategory: IReportItemFor[];
  totalSalesForProduct: IReportItemFor[];
  loading: boolean;
  error: string | null;
}

export interface IReportItemFor {
  id: number | string;
  product_name: string;
  category_name: string;
  total_sales: number;
}
