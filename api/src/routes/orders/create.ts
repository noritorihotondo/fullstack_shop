import { APIRoute, HTTPMethod } from '../../types';
import { CreateOrderResponse } from '../../types/Orders';

import { createOrder } from '../../services';

export default {
  method: HTTPMethod.POST,
  url: '/orders/:productId',
  controller: async (req): Promise<CreateOrderResponse> => {
    const { id, quantity } = req.body;
    const { productId } = req.params;

    return await createOrder({ id, quantity }, productId);
  },
} as APIRoute;
