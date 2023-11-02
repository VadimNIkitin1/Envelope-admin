export type T = 'avalibility';

export interface IColumnTable {
  name: string;
  code: T;
  type: string;
}

export interface ITableHeaders {
  tableHeaderCategories: IColumnTable[];
  tableHeaderMenu: IColumnTable[];
  tableHeaderClients: IColumnTable[];
  tableHeaderAnalytic: IColumnTable[];
  tableHeaderSettings: IColumnTable[];
}
