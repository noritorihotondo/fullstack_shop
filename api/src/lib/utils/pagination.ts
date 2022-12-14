import { EntityTarget, BaseEntity } from 'typeorm';

interface Pagination {
  page: number;
  pageSize: number;
}

export type GenericPaginationFunctionType<T extends BaseEntity> = (
  entity: EntityTarget<T>,
  options: Pagination,
) => Promise<unknown>;
