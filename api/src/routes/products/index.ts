import createProduct from './create';
import getAllProducts from './getAll';
import getAllProductsWithPagination from './getAllWithFilters';
import getProductById from './getById';
import updateProduct from './update';
import getProduct from './getProduct';
import addFileToProduct from './addFileToProduct';
import addMultipleFilesToProduct from './addMultipleFilesToProduct';

export default [
  createProduct,
  getAllProducts,
  getAllProductsWithPagination,
  getProductById,
  updateProduct,
  getProduct,
  addFileToProduct,
  addMultipleFilesToProduct,
];
