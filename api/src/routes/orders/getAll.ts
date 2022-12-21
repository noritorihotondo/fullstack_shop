import { APIRoute, HTTPMethod } from '../../types';
import { getAllOrders } from '../../services';

export default {
  method: HTTPMethod.GET,
  url: '/orders',
  controller: async () => {
    const order = getAllOrders();

    return order;
  },
} as APIRoute;
