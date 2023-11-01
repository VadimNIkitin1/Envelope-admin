export interface ICategory {
  id: number;
  name_rus: string;
  availability: boolean;
}

export interface IError {
  detail: string;
}

export interface ICategoriesInitialState {
  categories: ICategory[];
  category: ICategory;
  loading: boolean;
  error: IError | null;
}
