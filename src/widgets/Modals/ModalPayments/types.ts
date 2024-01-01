export interface IRequestPayments {
  min_delivery_amount: string | number;
  min_order_amount_for_free_delivery: string | number;
  id?: string | number | null;
}
