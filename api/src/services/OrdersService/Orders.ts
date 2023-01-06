import { AppDataSource } from './../../database/typeorm';
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
import { sendMail } from '../../middlewares/mailSender';

export const createOrder = async (
  body: CreateOrderRequest,
  productId: string,
  email: string,
): Promise<CreateOrderResponse> => {
  const order = new Orders();
  const product = new Product();

  product.id = productId;

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

  const OrderWithProduct = await getOrderWithProduct(body.id);

  const data = OrderWithProduct!;

  if (order) {
    await sendMail(email, data);
    console.log('mail has been sent');
  }

  return order;
};

export const getOrderWithProduct = async (id: string) => {
  const order = await Orders.findOne({
    where: { id },
    relations: { products: true },
  });

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
  const { id } = body;

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

  const updatedOrder = await order.save();

  return updatedOrder;
};
