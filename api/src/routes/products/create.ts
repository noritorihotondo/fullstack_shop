import { StatusCodes } from 'http-status-codes';
import { APIError } from '../../lib/utils/api-error';
import { createProduct } from '../../services/ProductService/Product';
import { HTTPMethod, ApiErrorCode, APIRoute, CreateProductResponse } from '../../types';
import { protectLogInUsers } from '../../middlewares/auth/auth';

export default {
  method: HTTPMethod.POST,
  url: '/products',
  middleware: [protectLogInUsers],
  controller: async (req): Promise<CreateProductResponse> => {
    const { productname, price } = req.body;

    return await createProduct({ productname, price });
  },
} as APIRoute;
