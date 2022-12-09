import { StatusCodes } from 'http-status-codes';
import { APIError } from '../../lib/utils/api-error';
import { addMultipleFilesToProduct } from '../../services';
import { HTTPMethod, ApiErrorCode, APIRoute, AddMultipleFilesToProductResponse } from '../../types';
import { protectLogInUsers } from '../../middlewares/auth/auth';
import { uploadFilesMiddleware } from '../../middlewares/uploadMultiple';

export default {
  method: HTTPMethod.PUT,
  url: '/product/multiple/:id',
  middleware: [protectLogInUsers, uploadFilesMiddleware],
  controller: async (req): Promise<AddMultipleFilesToProductResponse> => {
    const { id } = req.params;

    const { files } = req;

    if (!Array.isArray(files)) {
      throw new APIError(
        "Can't find a file",
        StatusCodes.NOT_FOUND,
        false,
        ApiErrorCode.CantFindFile,
        'uploadFile',
      );
    }

    return await addMultipleFilesToProduct({ id, files });
  },
} as APIRoute;
