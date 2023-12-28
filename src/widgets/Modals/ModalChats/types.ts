export interface IRequestChats {
  email: string;
  welcome_message_bot: string;
  delivery_chat: number;
  order_chat: number;
  completed_orders_chat: number;
  canceled_orders_chat: number;
  id?: string | number | null;
  welcome_image?: string;
}
