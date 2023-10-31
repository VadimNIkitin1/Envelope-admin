export interface IProduct {
  id: number;
  category_id: number;
  category_name: string;
  name_rus: string;
  price: number;
  availability: boolean;
  popular: boolean;
  delivery: boolean;
  takeaway: boolean;
  dinein: boolean;
}

export interface IUnit {
  id: number;
  name: string;
}

export interface IRequestProduct {
  id?: string | number;
  category_id?: number;
  name_rus?: string;
  description_rus?: string;
  price?: number;
  wt?: number;
  kilocalories?: number;
  proteins?: number;
  fats?: number;
  carbohydrates?: number;
  unit_id?: number;
  availability?: boolean;
  popular?: boolean;
  delivery?: boolean;
  takeaway?: boolean;
  dinein?: boolean;
  created_by?: number;
  code?: string;
}

export interface IProductsInitialState {
  products: IProduct[];
  product: IProduct | null;
  units: IUnit[];
  loading: boolean;
  error: string | null;
}
