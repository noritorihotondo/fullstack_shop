export interface ProductEntity {
  id: string;
  productname: string;
  price: number;
  rate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductResponse {
  id: string;
  productname: string;
  price: number;
  rate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductRequest {
  productname: string;
  price: number;
  rate: number;
  file: any;
}

export interface UpdateProductRequest {
  id?: string;
  productname?: string;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateProductResponse {
  id: string;
  productname?: string;
  price?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddImageToProductRequest {
  id: string;
  file: any;
}
export interface AddImageToProductResponse {
  id?: string;
}

export interface AddMultipleFilesToProductRequest {
  id: string;
  files: Express.Multer.File[];
}
export interface AddMultipleFilesToProductResponse {
  id: string;
}
