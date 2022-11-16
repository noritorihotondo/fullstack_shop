import { HTTPMethod } from '../../types';
import { APIRoute } from './../../types/API/Api';
import { getAllProducts } from '../../services/ProductService/Product';
export default {
  method: HTTPMethod.GET,
  url: '/products',
  controller: async () => {
    const product = getAllProducts();

    return product;
  },
} as APIRoute;
