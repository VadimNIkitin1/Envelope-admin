export interface IColumnTable {
  name: string;
  code: string;
  type: string;
}

export interface ITableHeaders {
  tableHeaderCategories: IColumnTable[];
  tableHeaderMenu: IColumnTable[];
  tableHeaderClients: IColumnTable[];
  tableHeaderAnalytic: IColumnTable[];
  tableHeaderSettings: IColumnTable[];
}
