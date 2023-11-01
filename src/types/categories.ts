export interface ICategory {
  id: number;
  name: string;
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
