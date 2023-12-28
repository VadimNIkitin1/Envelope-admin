export interface IRequestProduct {
  id?: string | number;
  category_id?: number;
  name?: string;
  description?: string;
  image?: string;
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
