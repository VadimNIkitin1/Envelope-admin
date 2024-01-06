export interface ICategory {
  id: number;
  name: string;
  availability: boolean;
}

export interface ICategoriesInitialState {
  categories: ICategory[];
  category: ICategory;
  loading: boolean;
  error: string | null;
}

export interface IRequestCheckbox {
  id: string | number;
  code: string;
}
