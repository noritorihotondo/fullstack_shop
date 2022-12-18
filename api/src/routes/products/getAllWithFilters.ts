import { HTTPMethod } from '../../types';
import { APIRoute } from '../../types/API/Api';
import { getAllProductsWithFilters } from '../../services/ProductService/Product';
import { Product } from '../../entities/Product';
import { FilterOptions } from '../../lib/utils/pagination';
export default {
  method: HTTPMethod.GET,
  url: '/products/pagination',
  controller: async (req) => {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);

    const productname = req.query.productname as string;
    const price = Number(req.query.price);
    const rate = Number(req.query.rate);

    const search: FilterOptions = {
      productname,
      price,
      rate,
    };

    for (const key in search) {
      if (
        search[key as keyof typeof search] === undefined ||
        search[key as keyof typeof search] === null ||
        Number.isNaN(search[key as keyof typeof search])
      )
        delete search[key as keyof typeof search];
    }

    const product = await getAllProductsWithFilters(Product, { page, pageSize, search });

    return product;
  },
} as APIRoute;
