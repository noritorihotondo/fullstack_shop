import { StatusCodes } from 'http-status-codes';
import { APIError } from '../../lib/utils/api-error';
import { addFileToProduct } from '../../services';
import { HTTPMethod, ApiErrorCode, APIRoute, AddImageToProductResponse } from '../../types';
import { protectLogInUsers } from '../../middlewares/auth/auth';
import { upload } from '../../middlewares/upload';

export default {
  method: HTTPMethod.PUT,
  url: '/products/:id',
  middleware: [protectLogInUsers, upload.single('src/images')],
  controller: async (req): Promise<AddImageToProductResponse> => {
    const { id } = req.params;
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

    return await addFileToProduct({ id, file });
  },
} as APIRoute;
