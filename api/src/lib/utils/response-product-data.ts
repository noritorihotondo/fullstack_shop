import { Product } from './../../entities/Product';

export const responseProductData = (product: Product) => {
  const { productname, price } = product;

  product.productname = productname;
  product.price = price;

  return product;
};
