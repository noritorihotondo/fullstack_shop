import { HTTPMethod } from '../../types';
import { APIRoute } from './../../types/API/Api';
import { getAllProducts } from '../../services/ProductService/Product';
import { Product } from '../../entities/Product';
export default {
  method: HTTPMethod.GET,
  url: '/products',
  controller: async (req) => {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);

    const product = await getAllProducts(Product, { page, pageSize });

    return product;
  },
} as APIRoute;
