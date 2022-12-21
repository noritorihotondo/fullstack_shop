import { StatusCodes } from 'http-status-codes';
import { APIError } from './../../lib/utils/api-error';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '../../types/Orders';

import { Orders } from '../../entities/Orders';
import { ApiErrorCode } from '../../types';
import { Product } from '../../entities/Product';

export const createOrder = async (
  body: CreateOrderRequest,
  productId: string,
): Promise<CreateOrderResponse> => {
  const order = new Orders();
  const product = new Product();

  product.id = productId;

  order.quantity = body.quantity;
  order.id = body.id;
  order.products = [product];

  await order.save();

  if (!order) {
    throw new APIError(
      "Can't find the order",
      StatusCodes.NOT_FOUND,
      false,
      ApiErrorCode.CantFindOrder,
      'CreateOrder',
    );
  }
  return order;
};

export const getAllOrders = async () => {
  const orders = await Orders.find();

  return orders;
};

export const getOrderById = async (id: string) => {
  const orders = await Orders.findOneBy({ id });

  return orders;
};

export const updateOrder = async (body: UpdateOrderRequest): Promise<UpdateOrderResponse> => {
  const { id, quantity } = body;

  const order = await getOrderById(id);

  if (!order) {
    throw new APIError(
      "Can't find the order",
      StatusCodes.NOT_FOUND,
      false,
      ApiErrorCode.CantFindOrder,
      'UpdateOrder',
    );
  }

  order.quantity = quantity;

  const updatedOrder = await order.save();

  return updatedOrder;
};
