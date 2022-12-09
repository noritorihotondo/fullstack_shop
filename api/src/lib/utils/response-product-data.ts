import { Product } from './../../entities/Product';

export const responseProductData = (product: Product) => {
  const { ...rest } = product;
  return rest;
};
