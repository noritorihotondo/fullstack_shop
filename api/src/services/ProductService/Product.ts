import { AppDataSource } from './../../database/typeorm';
import path from 'path';
import { StatusCodes } from 'http-status-codes';
import { APIError } from './../../lib/utils/api-error';
import {
  ApiErrorCode,
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductResponse,
  AddImageToProductRequest,
  AddImageToProductResponse,
  AddMultipleFilesToProductResponse,
  AddMultipleFilesToProductRequest,
} from '../../types';

import { GenericPaginationFunctionType } from '../../lib/utils/pagination';

import { Product } from './../../entities/Product';
import { File } from '../../entities/Files';
import { createFilePath } from '../../lib/utils/createFilePath';

export const createProduct = async (body: CreateProductRequest): Promise<CreateProductResponse> => {
  const { filename } = body.file;

  const product = new Product();

  product.productname = body.productname;
  product.price = body.price;

  await product.save();

  const newFile = new File();

  newFile.name = filename;
  newFile.product = product;
  newFile.path = createFilePath(filename);

  await newFile.save();

  if (!product) {
    throw new APIError(
      "Can't find the product",
      StatusCodes.NOT_FOUND,
      false,
      ApiErrorCode.CantFindProduct,
      'CreateProduct',
    );
  }
  console.log(filename);

  return product;
};

export const addMultipleFilesToProduct = async (
  body: AddMultipleFilesToProductRequest,
): Promise<AddMultipleFilesToProductResponse> => {
  const product = await getProductById(body.id);

  if (!product) {
    throw new APIError(
      "Can't find the product",
      StatusCodes.NOT_FOUND,
      false,
      ApiErrorCode.CantFindProduct,
      'CreateProduct',
    );
  }

  for (const { filename } of body.files) {
    const newFile = new File();
    newFile.product = product;
    newFile.name = filename;
    newFile.path = createFilePath(filename);

    await newFile.save();

    if (!newFile) {
      throw new APIError(
        "Can't find the product",
        StatusCodes.NOT_FOUND,
        false,
        ApiErrorCode.CantFindProduct,
        'CreateProduct',
      );
    }
  }

  const reloadedProduct = await getProductById(product.id);

  return reloadedProduct!;
};

export const addFileToProduct = async (
  body: AddImageToProductRequest,
): Promise<AddImageToProductResponse> => {
  const { filename } = body.file;

  const product = await getProductById(body.id);

  if (!product) {
    throw new APIError(
      "Can't find the product",
      StatusCodes.NOT_FOUND,
      false,
      ApiErrorCode.CantFindProduct,
      'CreateProduct',
    );
  }

  const newFile = new File();

  newFile.name = filename;

  newFile.product = product;
  newFile.path = createFilePath(filename);
  await newFile.save();

  if (!newFile) {
    throw new APIError(
      "Can't find the file",
      StatusCodes.NOT_FOUND,
      false,
      ApiErrorCode.CantFindFile,
      'CreateProduct',
    );
  }

  return product;
};

// export const getAllProducts = async (page: number, pageSize: number) => {
//   const product = await Product.find({
//     select: {
//       id: true,
//       productname: true,
//     },
//     skip: (Number(page) - 1) * Number(pageSize),
//     take: Number(pageSize),
//   });

//   return product;
// };

export const getAllProducts: GenericPaginationFunctionType<Product> = async (entity, options) => {
  const { page, pageSize } = options;

  const product = await AppDataSource.createQueryBuilder(entity, 'entity')
    .take(pageSize)
    .skip((page - 1) * pageSize)
    .getMany();

  return product;
};

export const getProductById = async (id: string) => {
  const product = await Product.findOne({ where: { id }, relations: ['files'] });

  return product;
};

export const getWholeProduct = async (id: string) => {
  const product = await Product.findOne({ where: { id }, relations: ['file'] });

  return product;
};

export const getImage = async (imageName: string) => {
  const relativePath = 'images';
  const absolutePath = path.resolve(relativePath, `${imageName}`);

  return absolutePath;
};

export const updateProduct = async (
  id: string,
  productname: string,
  price: number,
  updatedAt: Date,
  createdAt: Date,
): Promise<UpdateProductResponse> => {
  const product = await getProductById(id);

  if (!product) {
    throw new APIError(
      "Can't find the product",
      StatusCodes.NOT_FOUND,
      false,
      ApiErrorCode.CantFindProduct,
      'UpdateProduct',
    );
  }

  product.productname = productname;
  product.price = price;
  product.updatedAt = new Date();

  await product.save();

  return product;
};