export interface IProduct {
  id: number;
  category_id: number;
  category_name: string;
  name_rus: string;
  price: number;
  wt: number;
  kilocalories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  unit_id: number;
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

export interface IProductsInitialState {
  products: IProduct[];
  product: IProduct;
  units: IUnit[];
  loading: boolean;
  error: string | null;
}
