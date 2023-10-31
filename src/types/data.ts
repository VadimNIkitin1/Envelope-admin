import { IAnalytic, IClients, ISettings } from '../assets/db';
import { ICategory } from './categories';
import { IProduct } from './products';

export type TData = ICategory[] | IProduct[] | IClients[] | IAnalytic[] | ISettings[];
export type TDataForTable = ICategory | IProduct | IClients | IAnalytic | ISettings;
