import { StatusCodes } from 'http-status-codes';
import { APIError } from '../../lib/utils/api-error';
import { createProduct } from '../../services/ProductService/Product';
import { HTTPMethod, ApiErrorCode, APIRoute, CreateProductResponse } from '../../types';
import { protectLogInUsers } from '../../middlewares/auth/auth';
import { upload } from '../../middlewares/upload';

export default {
  method: HTTPMethod.POST,
  url: '/products',
  middleware: [protectLogInUsers, upload.single('src/images')],
  controller: async (req): Promise<CreateProductResponse> => {
    const { productname, price, rate, quantity } = req.body;
    const file = req.file;

    if (!file) {
      throw new APIError(
        "Can't find a file",
        StatusCodes.NOT_FOUND,
        false,
        ApiErrorCode.CantFindFile,
        'uploadFile',
      );
    }

    return await createProduct({ productname, price, rate, file, quantity });
  },
} as APIRoute;
