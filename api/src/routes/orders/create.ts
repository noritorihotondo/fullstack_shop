import { APIRoute, HTTPMethod } from '../../types';
import { CreateOrderResponse } from '../../types/Orders';

import { createOrder } from '../../services';

export default {
  method: HTTPMethod.POST,
  url: '/orders/:productId',
  controller: async (req): Promise<CreateOrderResponse> => {
    const { id, email } = req.body;
    const { productId } = req.params;

    return await createOrder({ id }, productId, email);
  },
} as APIRoute;
