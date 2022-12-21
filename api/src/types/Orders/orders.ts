export interface OrdersEntity {
  id: string;
  quantity: number;
}

export interface CreateOrderRequest {
  id: string;
  quantity: number;
}
export interface CreateOrderResponse {
  quantity: number;
}

export interface UpdateOrderRequest {
  id: string;
  quantity: number;
}
export interface UpdateOrderResponse {
  quantity?: number;
}
