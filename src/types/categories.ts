export interface ICategory {
  id: number;
  name_rus: string;
  availability: boolean;
}

export interface IRequestCategory {
  id?: number;
  name_rus?: string;
  availability?: boolean;
  created_by?: number;
  updated_by?: number;
  code?: string;
}

export interface ICategoriesInitialState {
  categories: ICategory[];
  category: ICategory | null;
  loading: boolean;
  error: string | null;
}
