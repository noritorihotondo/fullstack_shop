import { APIRoute, HTTPMethod } from '../../types';
import { getOrderById } from '../../services';

export default {
  method: HTTPMethod.GET,
  url: '/orders/id/:id',
  controller: async (req) => {
    const { id } = req.params;
    const order = getOrderById(id);

    return order;
  },
} as APIRoute;
