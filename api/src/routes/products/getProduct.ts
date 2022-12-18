import { StatusCodes } from 'http-status-codes';
import { APIRoute, HTTPMethod, ApiErrorCode } from '../../types';
import { APIError } from '../../lib/utils/api-error';
import { getProductById } from '../../services/ProductService/Product';
import { isUuid } from '../../lib/utils/isUuid';
import { protectLogInUsers } from '../../middlewares/auth/auth';

export default {
  method: HTTPMethod.GET,
  url: '/product/whole/:id',
  middleware: [protectLogInUsers],
  controller: async (req) => {
    const { id } = req.params;

    if (!isUuid(id)) {
      throw new APIError(
        'The uuid is not compatible with id',
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindProduct,
        'GetProductById',
      );
    }

    const product = await getProductById(id);

    if (!product) {
      throw new APIError(
        "Can't find the user",
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindProduct,
        'GetProductById',
      );
    }

    return product;
  },
} as APIRoute;
