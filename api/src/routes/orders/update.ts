import { APIRoute, HTTPMethod } from '../../types';

import { UpdateOrderResponse } from '../../types/Orders';
import { updateOrder } from '../../services';

export default {
  method: HTTPMethod.PUT,
  url: '/orders/id/:id',
  controller: async (req): Promise<UpdateOrderResponse> => {
    const { quantity } = req.body;
    const { id } = req.params;

    return await updateOrder({ id, quantity });
  },
} as APIRoute;
