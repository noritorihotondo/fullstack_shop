import { EntityTarget, BaseEntity } from 'typeorm';

export interface FilterOptions {
  productname?: string;
  price?: number;
  rate?: number;
}

interface Pagination {
  page: number;
  pageSize: number;
}
interface PaginationWithFilters {
  page: number;
  pageSize: number;
  search: FilterOptions;
}

export type GenericPaginationFunctionType<T extends BaseEntity> = (
  entity: EntityTarget<T>,
  options: Pagination,
) => Promise<unknown>;

export type GenericPaginationWithFiltersFuctionType<T extends BaseEntity> = (
  entity: EntityTarget<T>,
  options: PaginationWithFilters,
) => Promise<unknown>;
