import { IAnalytic, IClients, ISettings } from '../assets/db';
import { ICategory } from './categories';
import { IProduct } from './products';
import { ICustomers, IReportItemForCategory } from './report';

export type TData =
  | ICategory[]
  | IProduct[]
  | IClients[]
  | IAnalytic[]
  | ISettings[]
  | ICustomers[]
  | IReportItemForCategory[];
export type TDataForTable =
  | ICategory
  | IProduct
  | IClients
  | IAnalytic
  | ISettings
  | ICustomers
  | IReportItemForCategory;
