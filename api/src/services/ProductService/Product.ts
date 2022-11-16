import { UpdateProductRequest } from './../../types/Product/product';
import { APIError } from './../../lib/utils/api-error';
import { StatusCodes } from 'http-status-codes';
import {
  ApiErrorCode,
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductResponse,
} from '../../types';
import { Product } from './../../entities/Product';
import { responseProductData } from '../../lib/utils/response-product-data';

export const createProduct = async (body: CreateProductRequest): Promise<CreateProductResponse> => {
  let product = new Product();
  product.productname = body.productname;
  product.price = body.price;

  await product.save();

  if (!product) {
    throw new APIError(
      "Can't find the product",
      StatusCodes.NOT_FOUND,
      false,
      ApiErrorCode.CantFindProduct,
      'CreateProduct',
    );
  }

  return product;
};

export const getAllProducts = async () => {
  const product = await Product.find();

  return product;
};

export const getProductById = async (id: string) => {
  const product = await Product.findOneBy({ id });

  return product;
};

export const updateProduct = async (body: UpdateProductRequest): Promise<UpdateProductResponse> => {
  const product = await getProductById(body.id);

  if (!product) {
    throw new APIError(
      "Can't find the product",
      StatusCodes.NOT_FOUND,
      false,
      ApiErrorCode.CantFindProduct,
      'UpdateProduct',
    );
  }

  product.productname = body.productname!;
  product.price = body.price!;
  product.updatedAt = new Date();

  await product.save();

  return responseProductData(product);
};
