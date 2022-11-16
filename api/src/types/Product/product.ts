export interface ProductEntity {
  id: string;
  productname: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductResponse {
  id: string;
  productname: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductRequest {
  productname: string;
  price: number;
}

export interface UpdateProductRequest {
  id: string;
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
