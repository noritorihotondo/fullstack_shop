import { StatusCodes } from 'http-status-codes';
import { APIRoute, HTTPMethod, ApiErrorCode, UpdateProductResponse } from '../../types';
import { APIError } from '../../lib/utils/api-error';
import { getProductById, updateProduct } from '../../services';
import { isUuid } from '../../lib/utils/isUuid';

export default {
  method: HTTPMethod.PUT,
  url: '/product/:id',
  controller: async (req, res, next): Promise<UpdateProductResponse> => {
    const { productname, price, rate, updatedAt } = req.body;
    const { id } = req.params;

    if (!isUuid(id)) {
      throw new APIError(
        'The uuid is not compatible with id',
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindProduct,
        'UpdateProduct',
      );
    }

    const product = await getProductById(id);
    console.log(product);

    if (!product) {
      throw new APIError(
        "Can't find the product",
        StatusCodes.NOT_FOUND,
        true,
        ApiErrorCode.CantFindProduct,
        'UpdateProduct',
      );
    }

    const updatedProduct = await updateProduct(id, productname, price, rate, updatedAt);
    return updatedProduct;
  },
} as APIRoute;
